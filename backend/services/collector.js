/**
 * Deep Researcher AI Engine (Reconstructed)
 * Autonomous Crawler that synthesizes data from:
 * 1. Source Code (Static Analysis) - High Accuracy
 * 2. External Repos (GitHub) - Deep Context
 * 3. Live Deployment (Crawl) - Reality Verification
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const PortfolioContext = require('../models/PortfolioContext');
let pdf = null;
try { pdf = require('pdf-parse'); } catch (e) { console.warn('WARN: pdf-parse missing.'); }

const EXECUTION_LIMIT_MS = 8000;
const GITHUB_API = "https://api.github.com/repos";

class DeepResearcher {
  constructor(baseUrl, resumeUrl) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.resumeUrl = resumeUrl;
    this.startTime = Date.now();
    this.discovered = new Set();
    this.crawled = new Set();
    this.contentBlocks = [
      `IDENTITY: Carter Mover is a Lead AI Architect and Full-Stack Engineer (Class of 2026).
      CORE EXPERTISE: MEAN Stack, Autonomous Agentic Workflows, and High-Performance Architecture.
      CARTER FOCUS: Building premium digital infrastructure and AI-driven automation systems.`
    ];
  }

  async syncState(isFast = false) {
    const isConnected = require('mongoose').connection.readyState === 1;
    if (!isConnected) {
      console.warn('WARN: DB Disconnected. Using stateless mode.');
      if (this.discovered.size === 0) this.discovered.add(this.baseUrl);
      return;
    }
    
    // If fast-path, we use a quick query without heavy sorting
    const existing = await PortfolioContext.findOne({}).timeout(isFast ? 1000 : 5000);
    if (existing) {
      existing.discoveredUrls.forEach(u => this.discovered.add(u));
      existing.crawledUrls.forEach(u => this.crawled.add(u));
      this.contentBlocks.push(existing.content);
    }
    if (this.discovered.size === 0) this.discovered.add(this.baseUrl);
  }

  async saveState() {
    const isConnected = require('mongoose').connection.readyState === 1;
    if (!isConnected) return;
    const finalContent = this.contentBlocks.join("\n\n---\n\n").substring(0, 100000);
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

  async handleLocalSource() {
    console.log("INFO: Deep-Reading local source code templates...");
    const candidates = [
      path.join(process.cwd(), 'frontend', 'src', 'app'),
      path.join(__dirname, '..', '..', 'frontend', 'src', 'app'),
      path.join(process.cwd(), 'src', 'app')
    ];
    
    let appDir = null;
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        appDir = c;
        break;
      }
    }

    if (!appDir) {
      console.warn('WARN: Could not locate app source directory for deep-reading.');
      return;
    }

    console.log(`INFO: Using source directory: ${appDir}`);
    const files = this.getAllFiles(appDir);
    for (const file of files) {
      if (file.endsWith('.html') || file.endsWith('.ts')) {
        const content = fs.readFileSync(file, 'utf8');
        const cleaned = content.replace(/import\s+[\s\S]*?;/g, '').replace(/\s+/g, ' ').trim();
        if (cleaned.length > 100) {
          this.contentBlocks.push(`SOURCE CODE ANALYSIS (${path.basename(file)}):\n${cleaned.substring(0, 3000)}`);
        }
      }
    }
  }

  getAllFiles(dir, files = []) {
    fs.readdirSync(dir).forEach(file => {
      const name = path.join(dir, file);
      if (fs.statSync(name).isDirectory()) {
        if (!['shared', 'chatbot'].includes(file)) this.getAllFiles(name, files);
      } else {
        files.push(name);
      }
    });
    return files;
  }

  async run(isFast = false) {
    this.isFast = isFast;
    const deadline = isFast ? 7000 : EXECUTION_LIMIT_MS; // Aggressive 7s limit if fast
    
    await this.syncState(isFast);
    await this.handleLocalSource();
    
    if (Date.now() - this.startTime > deadline) {
      console.log("INFO: Fast-Path reached deadline after local analysis. Saving.");
      await this.saveState();
      return;
    }

    const queue = Array.from(this.discovered).filter(u => !this.crawled.has(u));
    for (const url of queue) {
      if (Date.now() - this.startTime > deadline) break;
      await this.processUrl(url);
    }
    await this.saveState();
  }

  async processUrl(url) {
    if (this.crawled.has(url)) return;
    this.crawled.add(url);
    try {
      if (url.endsWith('.pdf') || url.includes('/file#s=')) await this.handlePdf(url);
      else if (url.includes('github.com')) await this.handleGitHub(url);
      else if (url.startsWith(this.baseUrl) || url.startsWith('/')) await this.handlePage(url);
    } catch (e) { console.warn(`WARN: Failed ${url}: ${e.message}`); }
  }

  async handlePage(url) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    try {
      const res = await axios.get(fullUrl, { timeout: 4000 });
      let html = res.data;

      // Aggressive Noise Reduction: Strip scripts, styles, and junk
      const text = html
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, ' ')
        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, ' ')
        .replace(/<[^>]*>?/gm, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (text.length > 50) {
        this.contentBlocks.push(`SITE CRAWL (${fullUrl}):\n${text.substring(0, 3000)}`);
      }
    } catch (e) {
      console.warn(`WARN: handlePage failed for ${fullUrl}: ${e.message}`);
    }
  }

  async handlePdf(url) {
    if (!pdf) return;
    const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 5000 });
    const data = await pdf(res.data);
    this.contentBlocks.push(`RESUME DATA:\n${data.text.substring(0, 5000)}`);
  }

  async handleGitHub(url) {
    const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!match) return;
    const [_, owner, repo] = match;
    if (['settings', 'notifications'].includes(owner)) return;
    try {
      const readme = await axios.get(`${GITHUB_API}/${owner}/${repo}/readme`, { headers: { Accept: 'application/vnd.github.v3.raw' } });
      this.contentBlocks.push(`GITHUB (${owner}/${repo}):\n${readme.data.substring(0, 3000)}`);
    } catch (e) {}
  }
}

const getPortfolioContext = async (isFast = false) => {
  const prodUrl = process.env.PROD_FRONTEND_URL || 'https://carter-portfolio.fyi';
  const resumeUrl = process.env.RESUME_URL;
  const researcher = new DeepResearcher(prodUrl, resumeUrl);
  await researcher.run(isFast);
};

module.exports = { getPortfolioContext };
