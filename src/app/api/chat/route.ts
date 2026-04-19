import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are the TruthGuard-X AI Assistant. Your only purpose is to help users with fact-checking, digital hygiene, identifying misinformation, cybersecurity, online safety, and navigating the TruthGuard-X platform. Do not answer questions outside of these topics. If a user asks about something unrelated, politely refuse and remind them of your purpose. Be concise and authoritative. Use bullet points and formatting for clarity when appropriate.`;

interface TopicRule {
  keywords: string[];
  response: string;
}

const topicResponses: TopicRule[] = [
  {
    keywords: ["phishing", "fake email", "suspicious email", "phishing link"],
    response: "Phishing is one of the most common cyberattack vectors. Attackers impersonate trusted entities through email, SMS, or fake websites to steal credentials.\n\n**Key indicators of phishing:**\n• Mismatched sender domains (e.g., 'support@g00gle.com')\n• Urgent or threatening language demanding immediate action\n• Links that don't match the displayed text (hover to check)\n• Requests for passwords, OTPs, or financial information\n• Generic greetings instead of your actual name\n\n**What to do:** Don't click any links. Verify by contacting the organization directly through their official website. Report phishing emails to the platform and to cybercrime.gov.in."
  },
  {
    keywords: ["ransomware", "files encrypted", "ransom", "locked files", "decrypt"],
    response: "Ransomware encrypts your files and demands payment for the decryption key. It's one of the most devastating forms of malware.\n\n**If you're hit by ransomware:**\n1. Disconnect from all networks immediately\n2. Do NOT pay the ransom — there's no guarantee of recovery\n3. Preserve evidence — take photos of ransom screens\n4. Report to CERT-In (cert-in.org.in) and local police\n5. Check nomoreransom.org for free decryption tools\n\n**Prevention:** Maintain offline backups (3-2-1 rule), keep systems updated, use endpoint protection, and train users to recognize suspicious attachments."
  },
  {
    keywords: ["malware", "virus", "trojan", "spyware", "infected", "worm"],
    response: "Malware encompasses all forms of malicious software designed to harm systems or steal data.\n\n**Common types:**\n• **Viruses** — self-replicate by attaching to files\n• **Trojans** — disguise as legitimate software\n• **Worms** — spread across networks autonomously\n• **Spyware** — secretly monitor user activity\n• **Rootkits** — hide deep in the OS for persistent access\n\n**Protection measures:** Keep antivirus updated (Windows Defender is solid), avoid pirated software, don't disable security features, scan downloads before opening, and keep your OS patched."
  },
  {
    keywords: ["password", "strong password", "password manager", "password security"],
    response: "Strong password hygiene is fundamental to cybersecurity.\n\n**Best practices:**\n• Minimum 12+ characters with mixed case, numbers, and symbols\n• Never reuse passwords across services\n• Use a password manager (Bitwarden, 1Password, KeePass)\n• Enable 2FA on every account that supports it\n• Consider passphrases: 'correct-horse-battery-staple' is both strong and memorable\n\n**If compromised:** Change the password immediately, revoke active sessions, enable 2FA, and check if the same password was used elsewhere."
  },
  {
    keywords: ["vpn", "virtual private network", "browse safely", "hide ip", "privacy"],
    response: "A VPN encrypts your internet traffic and masks your IP address, providing privacy and security.\n\n**When to use a VPN:**\n• On public Wi-Fi networks\n• When accessing sensitive information remotely\n• To prevent ISP tracking\n\n**Choosing a VPN:** Avoid free VPNs (many log and sell your data). Recommended: ProtonVPN, Mullvad, or Windscribe. Look for no-log policies, DNS leak protection, and kill switch features.\n\n**Important:** A VPN is one layer of privacy, not complete anonymity. It won't protect against malware or phishing."
  },
  {
    keywords: ["deepfake", "fake video", "ai generated", "synthetic media", "face swap"],
    response: "Deepfakes use AI to create convincing but fabricated media — usually swapping faces in videos or generating synthetic speech.\n\n**Detection indicators:**\n• Unnatural facial movements or blinking\n• Inconsistent lighting and shadows\n• Blurred edges around the face\n• Audio-visual sync issues\n• Compression artifacts in specific regions\n\n**TruthGuard offers a Deepfake Scanner** in the Lab section that uses neural inference to analyze uploaded media for AI manipulation artifacts. Upload your suspicious media there for analysis."
  },
  {
    keywords: ["misinformation", "fake news", "disinformation", "false information", "propaganda"],
    response: "Misinformation is false information shared without malicious intent, while disinformation is deliberately fabricated to deceive.\n\n**How to combat misinformation:**\n1. Verify claims before sharing — use TruthGuard's Analysis Hub\n2. Check the original source — is it credible and primary?\n3. Look for corroboration across multiple trusted outlets\n4. Be skeptical of emotionally charged or sensational content\n5. Use reverse image search to verify photos\n6. Consult fact-checking organizations (AltNews, Snopes, PolitiFact)\n\n**Remember:** The goal of disinformation is to provoke an emotional reaction that makes you share without thinking."
  },
  {
    keywords: ["cybercrime", "report", "complaint", "fraud", "scam", "police"],
    response: "**Reporting cybercrime in India:**\n\n1. **Call 1930** — National Cyber Crime Helpline (especially for financial fraud — time is critical)\n2. **cybercrime.gov.in** — File detailed complaints online with evidence\n3. **Local Cyber Cell** — Visit your nearest police station's cyber cell in person\n4. **CERT-In** — Report security incidents at cert-in.org.in\n\n**Critical for financial fraud:** Call your bank immediately to freeze the account. The first few hours (golden period) are crucial for recovery.\n\n**Always preserve evidence:** Screenshots, transaction IDs, chat logs, email headers, and phone numbers."
  },
  {
    keywords: ["2fa", "two factor", "mfa", "authenticator", "otp", "two step", "multi factor"],
    response: "Two-Factor Authentication (2FA) adds a second verification step beyond your password.\n\n**Strength ranking:**\n1. 🔑 **Hardware keys** (YubiKey) — strongest, phishing-resistant\n2. 📱 **Authenticator apps** (Google Authenticator, Authy) — time-based OTPs, very strong\n3. 📧 **Email codes** — moderate security\n4. 📱 **SMS OTP** — weakest (vulnerable to SIM-swapping) but still better than passwords alone\n\n**Enable 2FA everywhere:** Email, banking, social media, cloud storage. It blocks 99% of automated attacks even if your password is compromised."
  },
  {
    keywords: ["social engineering", "manipulation", "human hacking"],
    response: "Social engineering attacks exploit human psychology rather than technical vulnerabilities. These are often the most effective attacks because they bypass all technical defenses.\n\n**Common techniques:**\n• **Phishing** — fake messages impersonating trusted entities\n• **Pretexting** — creating fabricated scenarios to extract info\n• **Baiting** — leaving infected USB drives or offering free downloads\n• **Tailgating** — physically following authorized personnel into secure areas\n• **Vishing** — voice phishing via phone calls\n\n**Defense:** Always verify identities through official channels, question urgency, and remember that no legitimate organization will ask for your password or OTP."
  },
  {
    keywords: ["data breach", "data leak", "compromised", "haveibeenpwned"],
    response: "A data breach exposes sensitive information without authorization.\n\n**If your data was breached:**\n1. Change passwords on the affected service immediately\n2. Change passwords on any site where you reused that password\n3. Enable 2FA on all accounts\n4. Monitor financial accounts for unauthorized transactions\n5. Check haveibeenpwned.com to see all breaches affecting your email\n6. Watch for targeted phishing using your leaked information\n\n**Prevention:** Use unique passwords per service, minimize data sharing, and regularly audit which services have your personal information."
  },
  {
    keywords: ["encryption", "encrypt", "end to end", "e2ee", "aes"],
    response: "Encryption transforms readable data into coded format that requires a specific key to decode.\n\n**Types:**\n• **Symmetric (AES-256)** — same key encrypts/decrypts, used for file and disk encryption\n• **Asymmetric (RSA)** — public/private key pairs, used for secure communication\n• **End-to-End (E2EE)** — only sender and receiver can read messages\n\n**Best practices:**\n• Enable full-disk encryption (BitLocker on Windows, FileVault on Mac)\n• Use E2EE messaging (Signal, WhatsApp)\n• Verify HTTPS on all websites\n• Encrypt sensitive files before cloud upload"
  },
  {
    keywords: ["identity theft", "stolen identity", "impersonation"],
    response: "Identity theft occurs when someone uses your personal information without authorization.\n\n**If you're a victim:**\n1. File an FIR and report at cybercrime.gov.in\n2. Contact your bank to freeze suspicious accounts\n3. Change all passwords and enable 2FA\n4. Monitor credit reports and bank statements\n5. Alert your contacts about potential impersonation\n\n**Prevention:** Don't share Aadhaar/PAN unnecessarily, shred physical documents, use unique passwords, enable transaction alerts on all bank accounts, and be cautious of unsolicited requests for personal information."
  },
  {
    keywords: ["fact check", "verify", "check claim", "credibility", "analyze"],
    response: "**How to fact-check effectively:**\n\n1. **TruthGuard Analysis Hub** — paste any claim for AI-powered credibility scoring\n2. **Source verification** — trace back to the primary/original source\n3. **Cross-reference** — check across multiple trusted outlets\n4. **Reverse image search** — verify photos via Google Images or TinEye\n5. **Check dates** — old news often recirculates as 'breaking'\n6. **Expert opinions** — see what domain specialists say\n7. **Fact-check sites** — AltNews (India), Snopes, PolitiFact, FactCheck.org\n\nUse TruthGuard's Dashboard to submit claims for comprehensive analysis!"
  },
  {
    keywords: ["backup", "data backup", "recover", "lost files"],
    response: "**The 3-2-1 Backup Rule:**\n• **3** copies of your data\n• **2** different storage types\n• **1** offsite copy (cloud)\n\n**Recommended strategy:**\n• Cloud: Google Drive, OneDrive, or iCloud for real-time sync\n• Local: External HDD/SSD for periodic full backups\n• Critical data: Encrypted offsite backup service\n\n**Key tips:** Automate backups, test restores periodically, and encrypt sensitive backup data. Backups are your best defense against ransomware, hardware failure, and accidental deletion."
  },
  {
    keywords: ["wifi", "public wifi", "wireless", "hotspot", "network security"],
    response: "**Public Wi-Fi security:**\n• Never access banking or sensitive accounts on public Wi-Fi\n• Always use a VPN to encrypt your traffic\n• Verify the network name with staff (attackers create fake hotspots)\n• Disable auto-connect to open networks\n• Turn off file sharing and AirDrop\n• Stick to HTTPS websites\n• Forget the network after use\n\n**Home Wi-Fi security:**\n• Use WPA3 encryption\n• Change the default router password\n• Update router firmware regularly\n• Hide your SSID if possible\n• Use a guest network for IoT devices"
  },
  {
    keywords: ["truthguard", "platform", "this tool", "how to use", "features", "what can you do"],
    response: "**TruthGuard-X offers a comprehensive security suite:**\n\n🔍 **Analysis Hub** — AI-powered fact-checking. Submit text, URLs, or screenshots for credibility analysis with scoring and reasoning.\n\n🎭 **Deepfake Suite** — Neural inference engine to detect AI-manipulated media (images/videos).\n\n🌐 **Network Graph** — Visualize how misinformation propagates across digital platforms.\n\n📋 **FIR Report Generator** — Automated First Information Report drafts for cybercrime incidents.\n\n📡 **Threat Radar** — Real-time monitoring of emerging security threats.\n\n💬 **AI Assistant** — That's me! Ask about cybersecurity, digital safety, or fact-checking."
  },
  {
    keywords: ["blockchain", "crypto", "bitcoin", "cryptocurrency", "nft"],
    response: "**Cryptocurrency safety:**\n\n⚠️ **Common crypto scams:**\n• Fake investment platforms with 'guaranteed returns'\n• Pump-and-dump schemes on new tokens\n• Phishing sites mimicking exchanges\n• Fake celebrity endorsement schemes\n• Rug pulls in DeFi projects\n\n**Stay safe:**\n• Only use established exchanges with 2FA\n• Never share private keys or seed phrases\n• Be extremely skeptical of guaranteed returns\n• Research thoroughly before investing\n• Report crypto fraud at cybercrime.gov.in"
  },
  {
    keywords: ["sql injection", "xss", "web security", "owasp", "vulnerability", "exploit", "zero day"],
    response: "**Web application security fundamentals:**\n\n• **SQL Injection** — malicious SQL through input fields. Defense: parameterized queries\n• **XSS** — injecting scripts into web pages. Defense: input sanitization, CSP headers\n• **CSRF** — tricking users into unwanted actions. Defense: anti-CSRF tokens\n• **Zero-day** — unknown vulnerabilities without patches. Defense: defense-in-depth, IDS/IPS\n\n**Resources:** OWASP Top 10 is essential reading for understanding critical web security risks. Keep all software patched and follow secure coding practices."
  },
  {
    keywords: ["digital hygiene", "online safety", "stay safe", "protect", "security tips", "best practices"],
    response: "**Essential digital hygiene checklist:**\n\n✅ Strong, unique passwords with a manager\n✅ 2FA on all accounts\n✅ Keep OS and apps updated\n✅ Reputable antivirus (Windows Defender is solid)\n✅ Cautious with links and attachments\n✅ Review app permissions regularly\n✅ 3-2-1 data backups\n✅ VPN on public networks\n✅ Tight privacy settings on social media\n✅ Monitor accounts for unauthorized activity\n\nDigital hygiene is an ongoing practice, not a one-time setup. Stay vigilant!"
  },
];

function getServerFallbackAnswer(input: string): string {
  const q = input.toLowerCase().trim();
  const qWords = q.split(/\s+/);

  let bestMatch: { rule: TopicRule; score: number } | null = null;

  for (const rule of topicResponses) {
    let score = 0;
    for (const keyword of rule.keywords) {
      const kLower = keyword.toLowerCase();
      if (q.includes(kLower)) {
        score += 30 + kLower.length;
      } else {
        const kWords = kLower.split(/\s+/);
        for (const kw of kWords) {
          if (kw.length >= 3 && qWords.some(w => w.includes(kw) || kw.includes(w))) {
            score += 8;
          }
        }
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { rule, score };
    }
  }

  if (bestMatch && bestMatch.score >= 8) {
    return bestMatch.rule.response;
  }

  return "I specialize in cybersecurity, digital safety, fact-checking, and misinformation defense. I can help with topics like:\n\n• **Phishing, malware, and ransomware** protection\n• **Password security** and 2FA setup\n• **Deepfake detection** and AI-generated content\n• **Misinformation** identification and fact-checking\n• **Reporting cybercrimes** in India\n• **Digital hygiene** best practices\n• **VPN, encryption, and privacy** tools\n\nCould you rephrase your question related to one of these areas? I'll do my best to help!";
}

export async function POST(req: NextRequest) {
  try {
    const { question, messages } = await req.json();

    const currentInput = question || (messages && messages.length > 0 ? messages[messages.length - 1].text : "");

    if (!currentInput || currentInput.trim() === "") {
      return NextResponse.json({ error: "No input provided." }, { status: 400 });
    }

    if (currentInput.length > 4000) {
      return NextResponse.json({ error: "Input too long. Please shorten your message (max 4000 characters)." }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      const fallbackAnswer = getServerFallbackAnswer(currentInput);
      return NextResponse.json({ answer: fallbackAnswer });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const groqMessages = [
      { 
        role: "system", 
        content: SYSTEM_PROMPT
      }
    ];

    if (messages && messages.length > 0) {
      const recentMessages = messages.slice(-10);
      recentMessages.forEach((m: any) => {
        groqMessages.push({ role: m.role === "user" ? "user" : "assistant", content: m.text });
      });
    } else {
      groqMessages.push({ role: "user", content: currentInput });
    }

    try {
      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages as any,
        max_tokens: 2048,
        temperature: 0.7,
      });

      const answer = response.choices[0].message.content;
      if (!answer || answer.trim() === "") {
        const fallbackAnswer = getServerFallbackAnswer(currentInput);
        return NextResponse.json({ answer: fallbackAnswer });
      }
      return NextResponse.json({ answer });
    } catch (apiError: any) {
      console.error("Groq API Error:", apiError.message);
      const fallbackAnswer = getServerFallbackAnswer(currentInput);
      return NextResponse.json({ answer: fallbackAnswer });
    }

  } catch (error: any) {
    console.error("Chat API Error:", error.message);
    return NextResponse.json({ error: "Something went wrong processing your request. Please try again." }, { status: 500 });
  }
}
