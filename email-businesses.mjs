import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import dns from 'dns';

// --- DEPENDENCY CHECK ---
async function checkAndInstallDependencies() {
    console.log("🔍 Checking for required packages...");
    const requiredPackages = ['@googlemaps/google-maps-services-js', 'axios', 'cheerio', 'nodemailer'];
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    
    // Check for the physical directory of each package
    const missingPackages = requiredPackages.filter(pkg => !fs.existsSync(path.join(nodeModulesPath, pkg.replace('/', path.sep))));

    if (missingPackages.length > 0) {
        console.log(`   > Missing: ${missingPackages.join(', ')}`);
        console.log("   > Installing... This might take a moment.");
        try {
            execSync(`npm install ${missingPackages.join(' ')}`, { stdio: 'inherit' });
            console.log("✅ Dependencies installed successfully.");
            console.log("   > Pausing for 2 seconds to allow file system to sync...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("   > Resuming.\n");
        } catch (error) {
            console.error("\n❌ Failed to install required packages. Please run 'npm install' manually and try again.");
            console.error(error);
            process.exit(1); // Exit if installation fails
        }
    } else {
        console.log("👍 All required packages are present.\n");
    }
}

// Global variables that will be populated after dependency check
let googleMapsClient, axios, cheerio, nodemailer;

// --- CONFIGURATION ---
const YOUR_GMAIL_APP_PASSWORD = "exiv gpsa vroi yhyf";
const YOUR_GOOGLE_PLACES_API_KEY = "AIzaSyCYchu9v3OeId9gxSOhK4O3TZBtZEWBCzM";
const SEARCH_QUERIES = [
    // General Services
    'local service businesses in New York City', 'small businesses in Chicago without a website', 'handyman services in Los Angeles',
    'painters in Philadelphia with few online reviews', 'roofers in Phoenix Arizona', 'landscapers in San Antonio', 'HVAC services in Dallas',
    'electricians in Brooklyn with outdated websites', 'plumbers in Houston needing customer reviews', 'cleaning services in Boston',
    'auto repair shops in Seattle', 'local movers in Denver', 'pest control in Austin', 'locksmiths in San Francisco',

    // Food & Drink
    'restaurants in Queens that need online ordering', 'independent coffee shops in Portland', 'bakeries in San Diego',
    'family-owned restaurants in Charlotte', 'pizzerias in Philadelphia', 'local diners in Indianapolis', 'ice cream shops in Miami',
    'sushi restaurants in Chicago with no online menu', 'bars in New Orleans with low ratings', 'cafes in Minneapolis',

    // Retail & Shops
    'small boutiques in Manhattan', 'local bookstores in Boston', 'independent hardware stores in Denver',
    'florists in San Jose', 'antique shops in Philadelphia', 'pet supply stores in Austin', 'butcher shops in Chicago',
    'gift shops in Seattle', 'record stores in Nashville', 'bike shops in Portland',

    // Health & Wellness
    'dental clinics in San Diego', 'private practice doctors in Houston', 'chiropractors in Phoenix', 'local pharmacies in Columbus',
    'optometrists in Fort Worth', 'veterinarians in Charlotte', 'gyms in Jacksonville', 'yoga studios in San Francisco',
    'massage therapists in Memphis', 'nail salons in Baltimore', 'barbershops in Detroit',

    // Professional Services
    'small law firms in Dallas', 'local accounting firms in San Jose', 'real estate agencies in Austin',
    'insurance agents in Indianapolis', 'mortgage brokers in Charlotte', 'financial advisors in Boston',
    'architects in Washington DC', 'marketing agencies in Atlanta needing a new site',
    'photographers in Las Vegas', 'tutors in El Paso',

    // Niche & Specific Searches
    'contractors in San Antonio with no listed email', 'plumbers in Brooklyn with no website',
    'restaurants in manhattan with low google reviews', 'landscaping companies in the Bronx',
    'electricians in Queens with old websites', 'auto shops in Staten Island',
    'boutique hotels in Miami', 'art galleries in Santa Fe', 'breweries in Denver',
    'wineries in Napa Valley', 'caterers in Chicago', 'event planners in Las Vegas',
    'dog walkers in San Francisco', 'dry cleaners in Boston', 'tailors in New York City',
    'home builders in Houston', 'interior designers in Los Angeles', 'cabinet makers in Phoenix',
    'pool cleaning services in Tampa', 'pressure washing services in Orlando', 'glass repair in San Diego',
    'tattoo artists in Portland', 'music lesson providers in Nashville', 'dance studios in Austin',
    'martial arts dojos in Seattle', 'crossfit gyms in Denver', 'spin studios in Chicago',
    'mechanics in Detroit with bad websites', 'local cafes in Brooklyn', 'independent jewelers in Philadelphia'
];

const SENT_EMAILS_FILE = path.join(process.cwd(), 'sent_emails.txt');
const CONFIG_FILE = path.join(process.cwd(), 'config.json');
const YOUR_EMAIL = 'cartermoyer75@gmail.com'; 
const YOUR_NAME = 'Carter Moyer';
const PORTFOLIO_URL = 'carter-portfolio.fyi';
const FIVERR_URL = 'https://www.fiverr.com/s/gDw55D9';
const SERVICE_PRICE = '$99';

// --- SCRIPT LOGIC ---

// 1. Setup Nodemailer transporter
// IMPORTANT: Use environment variables for credentials in a real-world scenario
let transporter; // Will be initialized in main()

// 2. Function to manage config file
function getConfig() {
    if (!fs.existsSync(CONFIG_FILE)) {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({ alwaysSend: false }, null, 2));
        return { alwaysSend: false };
    }
    const configData = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(configData);
}

function saveConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// 3. Function to create and get the list of sent emails
function getSentEmails() {
    if (!fs.existsSync(SENT_EMAILS_FILE)) {
        fs.writeFileSync(SENT_EMAILS_FILE, '');
        return new Set();
    }
    const emails = fs.readFileSync(SENT_EMAILS_FILE, 'utf-8');
    return new Set(emails.split('\n').filter(e => e.trim() !== ''));
}

// 4. Function to add an email to the sent list
function addSentEmail(email) {
    fs.appendFileSync(SENT_EMAILS_FILE, email + '\n');
}

// 5. Function to scrape an email from a website
async function findEmailOnPage(url) {
    try {
        const { data } = await axios.get(url, { 
            timeout: 10000, 
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            } 
        });
        const $ = cheerio.load(data);
        
        // Look for mailto links first, they are the most reliable
        const mailtoLinks = $('a[href^="mailto:"]');
        if (mailtoLinks.length > 0) {
            return mailtoLinks.first().attr('href').replace('mailto:', '');
        }
        
        // If no mailto, search the body text for email-like strings
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const bodyText = $('body').text();
        const emails = bodyText.match(emailRegex);
        if (emails && emails.length > 0) {
            // Filter out common image/file false positives
            const commonFalsePositives = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
            const validEmails = emails.filter(e => !commonFalsePositives.some(ext => e.endsWith(ext)));
            if (validEmails.length > 0) return validEmails[0];
        }
    } catch (error) {
        if (error.response && error.response.status) {
            console.error(`   - Could not scrape ${url}: Website returned status code ${error.response.status}. This often indicates anti-bot protection.`);
        } else {
            console.error(`   - Could not scrape ${url}: ${error.message}`);
        }
    }
    return null;
}

// 6. Function to check if a website is live
async function isWebsiteLive(url) {
    try {
        await axios.head(url, { timeout: 8000 });
        return true;
    } catch (error) {
        // We only care about DNS errors (ENOTFOUND) or clear HTTP errors (404, etc.)
        if (error.code === 'ENOTFOUND' || (error.response && error.response.status >= 400)) {
            console.log(`   - Website is not live or not found (${error.code || error.response.status}).`);
        } else {
            console.log(`   - An unexpected error occurred while checking website liveness: ${error.message}`);
        }
        return false;
    }
}

// 7. Function to find businesses using Google Places API
async function findBusinessesWithGoogle(apiKey, searchQuery, pageToken = null) {
    const client = new googleMapsClient.Client({});
    
    let requestParams;
    if (pageToken) {
        console.log(`🤖 Asking Google for next page of: "${searchQuery}"...`);
        requestParams = { params: { pagetoken: pageToken, key: apiKey }, timeout: 5000 };
    } else {
        console.log(`🤖 Asking Google for businesses matching: "${searchQuery}"...`);
        requestParams = { params: { query: searchQuery, key: apiKey }, timeout: 5000 };
    }

    try {
        const searchResponse = await client.textSearch(requestParams);

        const places = searchResponse.data.results;
        const nextPageToken = searchResponse.data.next_page_token;
        console.log(`✅ Google found ${places.length} potential places. Fetching details...`);
        
        const detailedBusinesses = [];
        const excludedKeywords = [
            'school', 'center', 'government', 'nonprofit', 'chamber', 'development', 
            'college', 'university', 'web design', 'web development', 'seo', 'marketing',
            'digital marketing', 'hosting', 'web solutions', 'creative'
        ];
        for (const place of places.slice(0, 20)) { // Fetch more to ensure we get enough with websites
            if (!place.place_id) continue;
            try {
                const detailsResponse = await client.placeDetails({
                    params: {
                        place_id: place.place_id,
                        fields: ['name', 'website'],
                        key: apiKey,
                    },
                    timeout: 5000,
                });
                const details = detailsResponse.data.result;
                if (details && details.website) {
                    const businessNameLower = details.name.toLowerCase();
                    if (excludedKeywords.some(keyword => businessNameLower.includes(keyword))) {
                        console.log(`   - Filtering out "${details.name}" due to excluded keyword.`);
                        continue;
                    }
                    detailedBusinesses.push({ name: details.name, website: details.website });
                }
            } catch (detailsError) {
                console.warn(`   - Could not fetch details for place ID ${place.place_id}: ${detailsError.message}`);
            }
        }
        console.log(`✅ Found ${detailedBusinesses.length} businesses with websites after filtering.`);
        return { businesses: detailedBusinesses, nextPageToken };

    } catch (error) {
        console.error("❌ An error occurred while communicating with the Google Places API:");
        if (error.response) {
            console.error(`   - ${error.response.data.error_message}`);
        } else {
            console.error(`   - ${error.message}`);
        }
        return { businesses: [], nextPageToken: null };
    }
}

// 8. Function to verify an email's domain
function verifyEmailDomain(email) {
    return new Promise((resolve) => {
        const domain = email.split('@')[1];
        if (!domain) return resolve(false);

        dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

// 9. Function to generate a dynamic, varied email
function generateDynamicEmail(businessName) {
    const subjects = [
        `Question about ${businessName}`,
        `A quick thought on ${businessName}'s website`,
        `Idea for ${businessName}`,
        `Enhancing your online presence`,
        `Inquiry from a web developer`
    ];

    const openings = [
        `My name is ${YOUR_NAME}, and I came across your business, ${businessName}, while looking for local companies in the area.`,
        `Hope you're having a great week. My name is ${YOUR_NAME}. I found ${businessName} online and was impressed with what you're doing.`,
        `I'm ${YOUR_NAME}, a web developer who helps businesses improve their online footprint. I was exploring your website and had an idea I wanted to share.`,
        `Hello! I'm ${YOUR_NAME}. As a fellow professional, I was looking at ${businessName}'s web presence and saw a potential opportunity.`
    ];

    const valuePropositions = [
        `I specialize in creating modern, high-performance websites. Would you be open to a complimentary **5-point website audit**? I can record a brief video review highlighting specific areas where you could attract more customers online. It's free, with no strings attached.`,
        `As a quick, complimentary service, I'd be happy to put together a **free analysis of your current website** to pinpoint opportunities for boosting user engagement and search rankings. Is that something you'd find valuable?`,
        `I build clean, fast, and effective websites for businesses like yours, with packages starting at just ${SERVICE_PRICE}. The goal is simple: to turn more visitors into customers.`,
        `I see you're using a standard website design. I could develop a custom, professional site that truly reflects the quality of your work at ${businessName}. As a starting point, I'd be glad to offer a **free mockup** of a new homepage design.`
    ];

    const closings = [
        `Would you be open to a brief, no-pressure chat next week to discuss this further?`,
        `If you're interested, you can check out my portfolio at <a href="http://${PORTFOLIO_URL}">${PORTFOLIO_URL}</a> or my Fiverr services here: <a href="${FIVERR_URL}">${FIVERR_URL}</a>.`,
        `Let me know if this sounds interesting. Either way, keep up the great work at ${businessName}!`,
        `Is this a priority for you right now? If so, I'd be happy to share some specific ideas.`
    ];

    // Helper to pick a random element
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const subject = pickRandom(subjects);
    const opening = pickRandom(openings);
    const valueProp = pickRandom(valuePropositions);
    const closing = pickRandom(closings);

    const htmlBody = `
        <p>Hi there,</p>
        <p>${opening}</p>
        <p>${valueProp}</p>
        <p>${closing}</p>
        <br/>
        <p>Sincerely,</p>
        <p>${YOUR_NAME}<br/>
        ${YOUR_EMAIL}<br/>
        <a href="http://${PORTFOLIO_URL}">${PORTFOLIO_URL}</a></p>
        <hr/>
        <p style="font-size: smaller; color: grey;">If you're not interested, please reply with 'unsubscribe' and I will not contact you again.</p>
    `;

    return { subject: subject, html: htmlBody };
}

// 10. Function to send the email
async function sendOutreachEmail(mailOptions) {
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${mailOptions.to}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to send email to ${mailOptions.to}: ${error.message}`);
        return false;
    }
}

// --- HELPER FOR RETRYING ---
async function loadDependencies(retryCount = 3, delay = 3000) {
    for (let i = 0; i < retryCount; i++) {
        try {
            // Dynamically import dependencies
            googleMapsClient = await import('@googlemaps/google-maps-services-js');
            axios = (await import('axios')).default;
            cheerio = await import('cheerio');
            nodemailer = (await import('nodemailer')).default;
            console.log("✅ Dependencies loaded successfully.");
            return true;
        } catch (error) {
            console.warn(`\n⚠️ Failed to load dependencies on attempt ${i + 1}.`);
            if (error.code === 'UNKNOWN' || error.code === 'ERR_MODULE_NOT_FOUND') {
                console.warn(`   > Error suggests a file sync issue (${error.code}). Retrying in ${delay / 1000} seconds...`);
                if (i < retryCount - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            } else {
                // For other unexpected errors, fail immediately
                throw error;
            }
        }
    }
    console.error("\n❌ Could not load dependencies after multiple retries. There might be a persistent issue with file permissions or antivirus software.");
    return false;
}

// --- MAIN EXECUTION ---
async function main() {
    await checkAndInstallDependencies();

    const dependenciesLoaded = await loadDependencies();
    if (!dependenciesLoaded) {
        process.exit(1); // Exit if dependencies can't be loaded
    }

    // Initialize transporter after nodemailer is loaded
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: YOUR_EMAIL, 
            pass: YOUR_GMAIL_APP_PASSWORD,
        },
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askQuestion(query) {
        return new Promise(resolve => rl.question(query, resolve));
    }

    const args = process.argv.slice(2);
    let numberOfEmailsToSend = parseInt(args.find(arg => !arg.startsWith('-')), 10);

    if (isNaN(numberOfEmailsToSend) || numberOfEmailsToSend <= 0) {
        while (true) {
            const answer = await askQuestion('Please enter the number of emails you would like to send: ');
            numberOfEmailsToSend = parseInt(answer, 10);
            if (Number.isInteger(numberOfEmailsToSend) && numberOfEmailsToSend > 0) {
                break;
            }
            console.log('Invalid input. Please provide a positive number.');
        }
    }

    console.log(`🚀 Starting outreach campaign. Goal: Send ${numberOfEmailsToSend} email(s).`);
    if (YOUR_GMAIL_APP_PASSWORD.includes("PASTE_YOUR")) {
        console.error("\n❌ ERROR: Gmail App Password is not set in the script.");
        console.error("   Please edit the YOUR_GMAIL_APP_PASSWORD constant in the file.");
        rl.close();
        return;
    }
    if (YOUR_GOOGLE_PLACES_API_KEY.includes("PASTE_YOUR")) {
        console.error("\n❌ ERROR: Google Places API Key is not set in the script.");
        console.error("   You need to create a key in the Google Cloud Console and enable the 'Places API'.");
        rl.close();
        return;
    }
    
    const config = getConfig();
    let emailsSent = 0;
    let alwaysSend = config.alwaysSend;

    // Check for command-line flags to override interactive mode
    const yyyFlag = args.includes('-yyy');
    const yyFlag = args.includes('-yy') || args.includes('-y');

    if (yyyFlag) {
        console.log("✅ 'Yes to all permanently' flag (-yyy) detected. Saving preference and running in non-interactive mode.");
        alwaysSend = true;
        if (!config.alwaysSend) {
            config.alwaysSend = true;
            saveConfig(config);
        }
    } else if (yyFlag) {
        console.log("✅ 'Yes to all for this session' flag (-y or -yy) detected. Running in non-interactive mode.");
        alwaysSend = true;
    }

    // Set up a listener for the 'c' key to exit
    process.stdin.on('keypress', (str, key) => {
        if (key && key.name === 'c') {
            console.log('\n🛑 Cancellation key pressed. Shutting down...');
            rl.close();
            process.exit(0);
        }
    });

    // Shuffle the search queries to ensure variety on each run
    console.log("🔀 Randomizing search queries for this session...");
    for (let i = SEARCH_QUERIES.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [SEARCH_QUERIES[i], SEARCH_QUERIES[j]] = [SEARCH_QUERIES[j], SEARCH_QUERIES[i]];
    }
    console.log("👍 Queries randomized.\n");

    for (const query of SEARCH_QUERIES) {
        if (emailsSent >= numberOfEmailsToSend) break; // Stop if goal is met

        console.log(`\n\n--- Starting New Search Query: "${query}" ---`);
        let nextPageToken = null;
        let hasMoreResultsForQuery = true;

        while (emailsSent < numberOfEmailsToSend && hasMoreResultsForQuery) {
            const googleResult = await findBusinessesWithGoogle(YOUR_GOOGLE_PLACES_API_KEY, query, nextPageToken);
            const businesses = googleResult.businesses;
            nextPageToken = googleResult.nextPageToken;

            if (!businesses || businesses.length === 0) {
                if (!nextPageToken) {
                    console.warn(`\n⚠️ No more results for the query: "${query}".`);
                    hasMoreResultsForQuery = false;
                } else {
                    console.warn("\nBatch was empty, but a next page token exists. Fetching next batch...");
                }
                continue; // Continue to next page token or next query
            }

            console.log(`\nStarting verification for batch of ${businesses.length} businesses...`);

            for (const business of businesses) {
                // Check if goal has been met inside the loop as well
                if (emailsSent >= numberOfEmailsToSend) break;

                const businessName = business.name;
                let websiteUrl = business.website;
                
                if (!websiteUrl) {
                    continue;
                }

                // Automatically fix URLs that are missing the protocol
                if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
                    websiteUrl = 'http://' + websiteUrl;
                }

                const isLive = await isWebsiteLive(websiteUrl);
                if (!isLive) {
                    continue;
                }

                const scrapedEmail = await findEmailOnPage(websiteUrl);
                if (!scrapedEmail) {
                    continue;
                }

                const isDomainValid = await verifyEmailDomain(scrapedEmail);
                if (!isDomainValid) {
                    continue;
                }
                
                if (getSentEmails().has(scrapedEmail)) {
                    continue;
                }
                
                // If we get here, we have a valid, new lead.
                console.log(`\n\n--- ✅ NEW VERIFIED LEAD (${emailsSent + 1} of ${numberOfEmailsToSend}) ---`);
                console.log(`Business: ${businessName}`);
                console.log(`Website:  ${websiteUrl}`);
                console.log(`Email:    ${scrapedEmail}`);
                
                // Generate a unique email for this lead
                const emailContent = generateDynamicEmail(businessName);

                const mailOptions = {
                    from: `"${YOUR_NAME}" <${YOUR_EMAIL}>`,
                    to: scrapedEmail,
                    subject: emailContent.subject,
                    html: emailContent.html,
                };

                let sendThisEmail = false;
                let skipAndBlacklist = false;

                if (alwaysSend) {
                    sendThisEmail = true;
                } else {
                    console.log("\n--- EMAIL PREVIEW ---");
                    console.log(`To: ${mailOptions.to}`);
                    console.log(`Subject: ${mailOptions.subject}`);
                    // A simplified text preview of the HTML email
                    const textPreview = mailOptions.html
                        .replace(/<p>/g, "\n")
                        .replace(/<\/p>/g, "")
                        .replace(/<br\s*\/?>/g, "\n")
                        .replace(/<hr\s*\/?>/g, "\n---\n")
                        .replace(/<a href=".*?"/g, "")
                        .replace(/<\/a>/g, "")
                        .replace(/<\/?strong>/g, "**") // Show bold as markdown
                        .replace(/<[^>]+>/g, '') // Strip remaining tags
                        .trim();
                    console.log("Body:" + textPreview);
                    console.log("\n--- END PREVIEW ---");

                    const answer = await askQuestion('\nSend email? (y=send, n=skip, c=cancel, yy=send-all, yyy=send-all-forever): ');
                    
                    if (answer.toLowerCase() === 'y') {
                        sendThisEmail = true;
                    } else if (answer.toLowerCase() === 'yy') {
                        sendThisEmail = true;
                        alwaysSend = true;
                        console.log("✅ OK, sending this and all future emails in this session automatically.");
                    } else if (answer.toLowerCase() === 'yyy') {
                        sendThisEmail = true;
                        alwaysSend = true;
                        config.alwaysSend = true;
                        saveConfig(config);
                        console.log("✅ OK, sending automatically. This preference is now saved for all future sessions.");
                    } else if (answer.toLowerCase() === 'n') {
                        skipAndBlacklist = true;
                    }
                    else { // 'c' or anything else
                        console.log("🛑 Operation cancelled by user.");
                        rl.close();
                        process.exit(0);
                    }
                }

                if (sendThisEmail) {
                    console.log("Attempting to send...");
                    const success = await sendOutreachEmail(mailOptions);

                    if (success) {
                        addSentEmail(scrapedEmail);
                        emailsSent++;
                        console.log(`   > Email count: ${emailsSent} / ${numberOfEmailsToSend}`);
                    }
                } else if (skipAndBlacklist) {
                    console.log(`   🚫 Skipping email to ${scrapedEmail}, but adding to ignore list.`);
                    addSentEmail(scrapedEmail);
                }
            }
            
            if (emailsSent < numberOfEmailsToSend && hasMoreResultsForQuery && !nextPageToken) {
                console.log(`\n🏁 No more results for this query.`);
                hasMoreResultsForQuery = false;
            } else if (emailsSent < numberOfEmailsToSend && hasMoreResultsForQuery) {
                console.log("\nBatch complete. Fetching next batch of businesses...");
                // Pause before fetching next page to respect API limits
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    console.log(`\n🎉 Campaign complete. Sent ${emailsSent} of ${numberOfEmailsToSend} emails. Exiting.`);
    rl.close();
}

main().catch(console.error); 