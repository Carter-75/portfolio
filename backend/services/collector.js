/**
 * Deep Researcher AI Engine
 * Autonomous Spider that crawls all links, parses PDFs, and analyzes 
 * GitHub repositories (README + File Tree) without hardcoding.
 */
const axios = require('axios');
let pdf = null;
try {
  pdf = require('pdf-parse');
} catch (e) {
  console.warn('WARN: pdf-parse not available. PDF research will be limited.');
}
const PortfolioContext = require('../models/PortfolioContext');

const EXECUTION_LIMIT_MS = 8000; // Limit each "burst" to 8 seconds to stay safe on Vercel
const GITHUB_API = "https://api.github.com/repos";

class DeepResearcher {
  constructor(baseUrl, resumeUrl) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.resumeUrl = resumeUrl;
    this.startTime = Date.now();
    this.discovered = new Set();
    this.crawled = new Set();
    this.contentBlocks = [
      `IDENTITY: Carter Moyer is a Class of 2026 High-Performance Software Engineer and Lead AI Architect.
      CORE EXPERTISE: MEAN Stack (MongoDB, Express, Angular, Node.js), Autonomous Agentic Workflows, and Deep Research AI systems.
      EDUCATION: University Degree track (Class of '26) with specialized research in hardware-software parity.
      CAREER FOCUS: Building premium digital infrastructures, custom bootstrapping scripts (like new-project.py), and AI-driven automation.
      NOTABLE SKILLS: TypeScript, Python, DevOps (Vercel/GitHub Actions), and Transformers.js.`
    ];
  } 

  async syncState() {
    const existing = await PortfolioContext.findOne({});
    if (existing) {
      existing.discoveredUrls.forEach(u => this.discovered.add(u));
      existing.crawledUrls.forEach(u => this.crawled.add(u));
      this.contentBlocks.push(existing.content);
    }
    if (this.discovered.size === 0) this.discovered.add(this.baseUrl);
    if (!this.discovered.has(this.resumeUrl)) this.discovered.add(this.resumeUrl);
  }

  async saveState() {
    const finalContent = this.contentBlocks.join("\n\n---\n\n").substring(0, 100000); // 100k cap
    await PortfolioContext.findOneAndUpdate(
      {},
      {
        content: finalContent,
        discoveredUrls: Array.from(this.discovered),
        crawledUrls: Array.from(this.crawled),
        isSyncing: this.crawled.size < this.discovered.size,
        lastUpdated: new Date()
      },
      { upsert: true }
    );
  }

  async addManualDiscovered(url) {
    if (url) this.discovered.add(url);
  }

  async run() {
    await this.syncState();
    const queue = Array.from(this.discovered).filter(u => !this.crawled.has(u));

    console.log(`INFO: Researcher starting burst. Queue size: ${queue.length}`);

    for (const url of queue) {
      if (Date.now() - this.startTime > EXECUTION_LIMIT_MS) {
        console.log("WARN: Burst time limit reached. Suspending research.");
        break;
      }
      await this.processUrl(url);
    }

    await this.saveState();
  }

  async processUrl(url) {
    if (this.crawled.has(url)) return;
    this.crawled.add(url);

    try {
      if (url.endsWith('.pdf') || url.includes('/file#s=')) {
        await this.handlePdf(url);
      } else if (url.includes('github.com')) {
        await this.handleGitHub(url);
      } else if (url.startsWith(this.baseUrl) || url.startsWith('/')) {
        await this.handlePage(url);
      } else {
        console.log(`INFO: Skipping external resource: ${url}`);
      }
    } catch (err) {
      console.warn(`WARN: Failed to research ${url}: ${err.message}`);
    }
  }

  async handlePage(url) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    const res = await axios.get(fullUrl, { timeout: 5000 });
    const html = res.data;

    // Discover links
    const linkRegex = /href="(\/[^"'>\s#?]+)"|href="(https?:\/\/[^"'>\s#?]+)"/g;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const found = match[1] || match[2];
      if (!this.discovered.has(found) && !found.match(/\.(png|jpg|zip|css|js)$/i)) {
        this.discovered.add(found);
      }
    }

    const text = html
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, ' ')
      .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, ' ')
      .replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gmi, ' ') // Remove navigation links
      .replace(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gmi, ' ') // Remove footer clutter
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ') // Collapse multiple spaces/newlines
      .trim();

    this.contentBlocks.push(`SOURCE: ${fullUrl}\nCONTENT: ${text.substring(0, 5000)}`);
  }

  async handlePdf(url) {
    if (!pdf) {
      console.warn(`WARN: Skipping PDF at ${url} because pdf-parse is not initialized.`);
      return;
    }
    console.log(`INFO: Researcher parsing PDF at ${url}`);
    try {
      const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 8000 });
      const data = await pdf(res.data);
      this.contentBlocks.push(`SOURCE (PDF): ${url}\nCONTENT: ${data.text.substring(0, 10000)}`);
    } catch (e) {
      console.warn(`WARN: Failed to parse PDF at ${url}: ${e.message}`);
    }
  }

  async handleGitHub(url) {
    // Standardize URL to extract owner/repo
    const repoMatch = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!repoMatch) return;
    const [_, owner, repo] = repoMatch;
    
    // Ignore common non-repo paths
    if (['settings', 'notifications', 'marketplace', 'explore'].includes(owner)) return;

    console.log(`INFO: Researcher analyzing GitHub Repo: ${owner}/${repo}`);

    try {
      // 1. Get README
      const readmeRes = await axios.get(`${GITHUB_API}/${owner}/${repo}/readme`, { 
        headers: { Accept: 'application/vnd.github.v3.raw' } 
      });
      // 2. Get File Tree (Recursive)
      const treeRes = await axios.get(`${GITHUB_API}/${owner}/${repo}/git/trees/main?recursive=1`);
      const tree = treeRes.data.tree.map(f => f.path).join("\n");

      this.contentBlocks.push(`GITHUB REPO: ${owner}/${repo}\nREADME: ${readmeRes.data.substring(0, 5000)}\n\nFILE TREE:\n${tree.substring(0, 2000)}`);
    } catch (e) {
      console.warn(`WARN: GitHub API fail for ${owner}/${repo}: ${e.message}`);
    }
  }
}

const getPortfolioContext = async () => {
  try {
    const prodUrl = process.env.PROD_FRONTEND_URL || 'https://carter-portfolio.fyi';
    const resumeUrl = process.env.RESUME_URL || 'https://smallpdf.com/file#s=cd7e8dd2-4436-4f28-985e-6b866b38f2cb';
    
    try {
      const researcher = new DeepResearcher(prodUrl, resumeUrl);
      await researcher.run();
    } catch (crawlErr) {
      console.warn('WARN: Public crawl failed. Attempting localhost fallback...');
      const localUrl = `http://localhost:${process.env.PORT || 3000}`;
      const researcher = new DeepResearcher(localUrl, resumeUrl);
      await researcher.addManualDiscovered(prodUrl); // Ensure we mapping back
      await researcher.run();
    }
  } catch (err) {
    console.error(`ERROR: Deep Researcher failed fundamentally: ${err.message}`);
    // Do not re-throw, let the route handler use the last valid context
  }
};

module.exports = { getPortfolioContext };
