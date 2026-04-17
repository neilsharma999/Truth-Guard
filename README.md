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

I used AI pretty heavily throughout this project — here's exactly where:

- **Writing code:** I used Claude and Gemini as pair-programming tools to help write React components, API routes, CSS, and to fix bugs. I handled the architecture and design decisions myself, but AI helped me move faster on the actual coding.
- **The app itself runs on AI:** The misinformation detector calls OpenRouter API (Gemini, LLaMA models) to score news credibility. The chatbot runs on Groq API. These are core features — the whole point of the app is AI-powered analysis.
- **This README was written with AI help.** I used AI to help draft and format this documentation.
- **Debugging and deployment:** AI helped me troubleshoot build errors, fix CSS issues, and get the Vercel deployment working.

**What I did myself:** The project idea, the data research (police stations, helplines, legal info), testing everything, and making the final calls on how things should look and work.

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
