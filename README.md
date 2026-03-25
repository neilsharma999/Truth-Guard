🧠 TruthGuard-X
An AI-powered misinformation detector designed for the modern web. TruthGuard-X analyzes text in real-time to identify fake news, propaganda, and deepfake-style misinformation, providing users with a definitive Credibility Score.

This project is built specifically to address the unique misinformation landscape in India, helping Gen Z and general users verify "WhatsApp University" forwards and viral headlines before they spread.

🚀 Key Features
🔎 Real-Time Detection: Instant analysis of text, headlines, or social media posts.

📊 Credibility Dashboard: A visual 0–100 score indicating the trustworthiness of content.

🤖 Multi-Model Consensus: Uses a "Judge" architecture to cross-reference multiple AI models (Claude 3.5, GPT-4o, and Llama 3) via OpenRouter.

🇮🇳 Bharat-Centric Logic: Optimized to understand regional context and local misinformation patterns.

⚡ Ultra-Fast UI: Built with Next.js 15+ and React 19 for a seamless, high-performance experience.

🛠 Tech Stack
Frontend: React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS

Backend: Next.js API Routes (Serverless)

AI Engine: OpenRouter API & Groq (Multi-model fallback logic)

State Management: React Hooks

Deployment: Vercel

🧩 How It Works
Input: The user pastes a statement, news article, or social media claim.

Analysis: The backend sends the text to the multi-model AI engine.

Cross-Reference: The system checks the text against known misinformation patterns and factual databases.

Reporting: A credibility score is generated along with a brief explanation of why the content is considered true, suspicious, or misleading.

⚙️ Setup & Installation
Prerequisites
Node.js 18.17 or later

An OpenRouter API Key

Local Development
Clone the Repository:

Bash
git clone https://github.com/YOUR_USERNAME/truthguard-x.git
cd truthguard-x
Install Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root directory and add your API keys:

Code snippet
OPENROUTER_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
Run the Development Server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

🐍 Python Integration (Pro Feature)
To ensure high-intensity testing, a secondary Python-based Stress Tester is included in the /tools directory. This script allows for bulk-testing of misinformation datasets to benchmark the detector's accuracy across thousands of samples.

To run the stress tester:

Bash
python tools/stress_test.py
🎯 Purpose
Misinformation moves faster than the truth. TruthGuard-X is designed to close that gap by making fact-checking as easy as copy-pasting. The goal is to build a more informed digital India by providing simple, accessible, and high-speed verification tools.

⚠️ Disclaimer
This tool provides an AI-generated estimate of credibility and should be used as a supplementary guide. Always verify critical information through official or trusted journalistic sources.

🤝 Contributing
Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

⭐ Support
If TruthGuard-X helped you verify a claim, consider giving this repository a star ⭐ on GitHub!
