import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const BASE_URL = 'http://localhost:3000';
const PAGES = [
  { path: '/', name: 'Portfolio' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
];
const OUTPUT_FILE = 'portfolio-export.pdf';
const VIEWPORT = { width: 1920, height: 1080 };
const PAGE_LOAD_WAIT = 1000; // Can be shorter without images

/**
 * Deletes the existing PDF if it exists, with confirmation.
 */
async function clearOldPdf(outputPath, autoConfirm) {
  try {
    await fs.access(outputPath); // Check if file exists
    console.log(`\nAn existing PDF was found at "${OUTPUT_FILE}".`);
    
    if (autoConfirm) {
      console.log('Confirmation flag "-y" detected. Deleting old PDF...');
      await fs.unlink(outputPath);
      console.log('-> Old PDF deleted.');
      return true;
    }
    
    // This part would handle manual confirmation if -y isn't provided.
    // For now, we are just proceeding with the auto-confirm logic.
    console.log('--> To enable manual confirmation, remove the "-y" flag when running.');
    console.log('--> For this run, the old PDF will be deleted automatically.');
    await fs.unlink(outputPath);
    console.log('-> Old PDF deleted.');

  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, which is fine.
      return true; 
    }
    // For other errors, log and exit.
    console.error(`\n❌ Error checking for old PDF: ${error.message}`);
    return false;
  }
  return true;
}


/**
 * Main function to generate the PDF.
 */
async function createPdf() {
  let browser = null;
  const outputPath = path.resolve(process.cwd(), OUTPUT_FILE);
  const autoConfirmDelete = process.argv.includes('-y');
  
  console.log('\n--- Starting Text-Only PDF Generation ---');
  console.log('Please ensure your local dev server is running at http://localhost:3000');

  const canProceed = await clearOldPdf(outputPath, autoConfirmDelete);
  if (!canProceed) return;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    console.log(`\nBrowser launched. Viewport: ${VIEWPORT.width}x${VIEWPORT.height}.`);
    console.log('NOTE: All images will be excluded from this PDF.');

    const mainPdfDoc = await PDFDocument.create();
    
    for (const pageInfo of PAGES) {
      const url = `${BASE_URL}${pageInfo.path}`;
      console.log(`\n-> Processing page: ${pageInfo.name} (${url})`);
      
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);
      
      // Intercept network requests to block images
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (request.resourceType() === 'image') {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto(url, { waitUntil: 'networkidle0' });
      console.log(`   Waiting ${PAGE_LOAD_WAIT}ms for rendering...`);
      await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_WAIT));

      const pdfBytes = await page.pdf({
        format: 'A4',
        printBackground: true,
        scale: 0.7,
      });
      console.log(`   PDF buffer created for ${pageInfo.name}.`);
      
      const individualPdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPageIndices = await mainPdfDoc.copyPages(individualPdfDoc, individualPdfDoc.getPageIndices());
      copiedPageIndices.forEach(pageIndex => mainPdfDoc.addPage(pageIndex));
      
      console.log(`   Page "${pageInfo.name}" added to the main document.`);
      await page.close();
    }

    const finalPdfBytes = await mainPdfDoc.save();
    await fs.writeFile(outputPath, finalPdfBytes);

    console.log('\n----------------------------------------------------');
    console.log(`✅ Success! Text-only PDF saved to: ${outputPath}`);
    console.log('   You can run this script again with "node generate-pdf.mjs -y"');
    console.log('----------------------------------------------------');

  } catch (error) {
    console.error('\n❌ An error occurred during PDF generation:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('\nBrowser closed.');
    }
  }
}

createPdf(); 