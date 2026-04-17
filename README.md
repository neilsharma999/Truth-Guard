# 🧠 AI Misinformation Detector

**Live Website:** [https://truthguard-one.vercel.app](https://truthguard-one.vercel.app)

An AI-powered tool that detects **fake news and misinformation in real time**.
This project analyzes text using AI and provides a **credibility score** to help users identify whether the information is trustworthy or potentially misleading.

TruthGuard-X is a Next.js 16 (App Router) project built with React 19, Tailwind CSS v4, and Framer Motion. It calls the OpenRouter and Groq APIs to perform fact-checking and deepfake analysis for the Indian market ("Bharat Edition").

---



## 🚀 Features

* 🔎 **Real-time misinformation detection**
* 🤖 **AI-powered text analysis**
* 📊 **Credibility score (0–100)**
* 🌐 **Clean and modern UI**
* ⚡ **Fast response**
* 🧠 Designed for **Gen Z and general users**

---

## 🧩 How It Works

1. User enters a **statement or news text**.
2. The AI model analyzes the content.
3. The system compares it with known patterns of misinformation.
4. A **credibility score** is generated.
5. The tool shows whether the content is **likely true, suspicious, or misleading**.

---

## 🛠 Tech Stack

* **Frontend:** React 19, Next.js 16, TypeScript, Tailwind CSS.
* **Backend:** Next.js API Routes.
* **AI:** OpenRouter API (Multi-model support).
* **Deployment:** Vercel.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone & Install:**
   ```bash
   git clone <repo-url>
   cd truthguard-x
   npm install
   ```

2. **Optional: Add OpenRouter API Key** (for AI-powered analysis)
   - Edit `.env.local`:
     ```
     OPENROUTER_API_KEY=sk-or-v1-your-key-here
     ```
   - Get a free key from: [https://openrouter.ai/api/keys](https://openrouter.ai/api/keys)
   - **Note:** The app works without a key using local pattern matching

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🚀 Vercel Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository
4. Click **"Deploy"**

### Step 3: Add Environment Variables (Optional)
1. After import, go to **Settings → Environment Variables**
2. Add: `OPENROUTER_API_KEY=sk-or-v1-your-key-here`
3. Click **"Save"** and **"Redeploy"**

### Step 4: Done! 🎉
Your app is now live on Vercel!

---

## 🔐 Security Notes

- **Never commit `.env.local`** - it's in `.gitignore`
- API keys are only loaded on the server (Next.js API routes)
- For Vercel, keys are securely stored in project settings
- Test files use environment variables for security

---

## 📸 Demo

Example:

Input:
Bihar is in India.

Output:
Credibility Score: **100 / 100**
Result: **True information**

---

## 🎯 Purpose

Misinformation spreads quickly on the internet.
This tool helps people **verify information before believing or sharing it**.

The goal is to make **fact-checking simple and accessible for everyone.**

---

## ⚠️ Disclaimer

This tool provides an **AI-generated credibility estimate** and should not be considered a perfect fact-checking system. Always verify important information using trusted sources.

---

## 🤖 AI Usage Declaration

> **This project uses AI.** Below is a transparent breakdown of how AI was used throughout this project.

### AI in Development
* **Code Assistance:** Portions of the codebase, including React components, API routes, and styling, were developed with pair-programming assistance from AI coding tools (Google Gemini, Anthropic Claude).
* **Debugging & Deployment:** AI assistants helped troubleshoot build errors, configure Vercel deployment, and resolve CSS/UI bugs.
* **Design & UX:** Some styling decisions, UI layouts, and component structures were iterated on using AI-assisted design discussions.

### AI in the Application Itself
* **Misinformation Analysis:** The core credibility scoring engine uses the **OpenRouter API** to route prompts to large language models (e.g., Google Gemini, Meta LLaMA) for real-time news and claim analysis.
* **AI Chatbot:** The built-in chat feature uses the **Groq API** running open-source LLMs to answer user questions about misinformation, digital safety, and Indian cyber law.
* **Deepfake Detection:** The deepfake analysis module leverages AI models to evaluate media authenticity.

### What Was NOT AI-Generated
* **Project concept & ideation** — conceived and designed by the team.
* **Data curation** (police station database, helpline numbers, legal references) — manually researched.
* **Testing & validation** — manually performed by the team.

---

## 📌 Future Improvements

* Real-time news verification
* Browser extension
* Image misinformation detection
* Social media integration

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests to improve the project.

---

## ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
