interface KBEntry {
  keywords: string[];
  answer: string;
}

const knowledgeBase: KBEntry[] = [
  // ── TruthGuard Platform ──
  {
    keywords: ["truthguard", "what is truthguard", "about truthguard", "this platform", "this app", "this website"],
    answer: "TruthGuard-X is an AI-powered misinformation detection platform. It combines neural fact-checking, deepfake analysis, network propagation mapping, and automated FIR report generation to help users combat digital misinformation. The system uses multiple AI models and heuristic engines to evaluate the credibility of claims, URLs, and media."
  },
  {
    keywords: ["analysis hub", "analyze", "fact check", "check claim", "verify claim", "credibility", "scan text"],
    answer: "The Analysis Hub is TruthGuard's core fact-checking engine. You can submit text snippets, URLs, or screenshots for AI-powered credibility analysis. The system evaluates claims against multiple data sources and returns a credibility score (0-100), classification (Factual, Misleading, False, Opinion, or Unverifiable), and detailed reasoning. Navigate to the Dashboard to use it."
  },
  {
    keywords: ["deepfake", "fake video", "ai video", "synthetic media", "face swap", "deepfake scanner", "detect deepfake"],
    answer: "Deepfakes are AI-generated synthetic media where a person's likeness is replaced with another's. TruthGuard's Deepfake Scanner (available in the Deepfake Suite) uses neural inference to analyze uploaded images and videos for signs of AI manipulation — including face-swap artifacts, inconsistent lighting, unnatural blinking patterns, and compression anomalies. Upload media in the Lab section to scan it."
  },
  {
    keywords: ["fir", "fir report", "file report", "police report", "complaint", "first information report", "generate report"],
    answer: "TruthGuard can generate automated First Information Report (FIR) drafts for cybercrimes. Navigate to the FIR Report section, fill in the incident details (type of crime, description, evidence), and the system will generate a properly formatted FIR document that you can download and submit to your local police station or cyber cell."
  },
  {
    keywords: ["network", "propagation", "network graph", "misinformation spread", "how misinformation spreads", "viral", "spread pattern"],
    answer: "The Network Graph visualizes how misinformation propagates across digital platforms. After analyzing a claim, you can view the Misinformation Propagation Map to see simulated spread patterns, node connections, and amplification vectors. This helps understand how false narratives gain traction through social networks and media echo chambers."
  },
  {
    keywords: ["radar", "threat radar", "threat detection", "threats", "security radar"],
    answer: "The Threat Radar provides real-time monitoring of emerging misinformation threats and cybersecurity risks. It aggregates signals from multiple intelligence sources to display active threat vectors, trending false narratives, and geographic hotspots of disinformation activity."
  },
  {
    keywords: ["usb", "usb threat", "usb attack", "hardware attack", "removable device", "usb security"],
    answer: "The USB Threat Awareness module educates users about hardware-based attack vectors. Malicious USB devices can carry payloads like keystroke injection (Rubber Ducky attacks), firmware manipulation, or data exfiltration malware. Never plug in unknown USB devices — they can compromise your system in seconds, bypassing most software defenses."
  },
  {
    keywords: ["how to use", "how does it work", "getting started", "tutorial", "guide", "help me start"],
    answer: "Getting started with TruthGuard:\n\n1. **Fact-Check Claims**: Go to the Dashboard → Analysis Hub, paste any text or URL, and click 'Launch Intelligence Scan'\n2. **Scan for Deepfakes**: Visit the Lab → Deepfake Suite to upload and analyze images\n3. **Generate FIR Reports**: Navigate to FIR Report to draft cyber-incident reports\n4. **View Threat Landscape**: Check the Radar and Network sections for threat intelligence\n5. **Ask Me Questions**: Use this chat for any cybersecurity or digital safety queries!"
  },

  // ── Cybersecurity Topics ──
  {
    keywords: ["phishing", "phishing attack", "fake email", "email scam", "suspicious email", "phishing link"],
    answer: "Phishing is a social engineering attack where criminals impersonate trusted entities via email, SMS, or fake websites to steal credentials and data.\n\n**How to identify phishing:**\n• Check the sender's email domain carefully (e.g., 'support@g00gle.com' vs 'support@google.com')\n• Hover over links before clicking — verify the actual URL\n• Look for urgency tactics ('Your account will be suspended!')\n• Watch for grammar errors and generic greetings\n• Never share OTPs or passwords via email\n\nIf you suspect phishing, report it to the platform and to cybercrime.gov.in."
  },
  {
    keywords: ["ransomware", "encrypted files", "ransom", "files locked", "malware encrypt"],
    answer: "Ransomware is malware that encrypts your files and demands payment for the decryption key.\n\n**Prevention:**\n• Keep regular offline backups (3-2-1 backup rule)\n• Update your OS and software promptly\n• Don't open suspicious email attachments\n• Use reputable antivirus with real-time protection\n• Enable controlled folder access in Windows\n\n**If infected:** Do NOT pay the ransom — it doesn't guarantee recovery. Disconnect from networks, preserve evidence, and report to CERT-In (cert-in.org.in) or your local cyber cell."
  },
  {
    keywords: ["malware", "virus", "trojan", "worm", "spyware", "adware", "infected computer"],
    answer: "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.\n\n**Common types:**\n• **Virus**: Self-replicating code that attaches to files\n• **Trojan**: Disguises as legitimate software\n• **Worm**: Spreads across networks without user action\n• **Spyware**: Secretly monitors user activity\n• **Ransomware**: Encrypts files for ransom\n\n**Protection:** Use updated antivirus, avoid pirated software, keep your OS patched, and don't click suspicious links."
  },
  {
    keywords: ["password", "strong password", "password security", "password manager", "password tips", "secure password"],
    answer: "**Password best practices:**\n• Use at least 12+ characters with uppercase, lowercase, numbers, and symbols\n• Never reuse passwords across sites\n• Use a password manager (Bitwarden, 1Password, or KeePass)\n• Enable two-factor authentication (2FA) everywhere\n• Never share passwords via chat or email\n• Change passwords immediately if a breach is suspected\n\nA passphrase like 'correct-horse-battery-staple' can be more secure and memorable than 'P@$$w0rd123'."
  },
  {
    keywords: ["2fa", "two factor", "mfa", "multi factor", "authenticator", "otp", "two step"],
    answer: "Two-Factor Authentication (2FA) adds an extra security layer beyond passwords.\n\n**Types of 2FA (strongest to weakest):**\n1. **Hardware keys** (YubiKey) — best protection against phishing\n2. **Authenticator apps** (Google Authenticator, Authy) — time-based OTPs\n3. **SMS OTPs** — vulnerable to SIM-swapping, but still better than nothing\n\nEnable 2FA on all important accounts: email, banking, social media. If a service offers it, always turn it on."
  },
  {
    keywords: ["vpn", "virtual private network", "privacy", "browse safely", "anonymous browsing", "hide ip"],
    answer: "A VPN (Virtual Private Network) encrypts your internet traffic and masks your IP address.\n\n**When to use a VPN:**\n• On public Wi-Fi (airports, cafés, hotels)\n• When accessing sensitive data remotely\n• To prevent ISP tracking\n\n**Choosing a VPN:**\n• Prefer paid, no-log VPNs (ProtonVPN, Mullvad, Windscribe)\n• Avoid free VPNs — many sell your data\n• Check for DNS leak protection and a kill switch\n\nNote: A VPN doesn't make you fully anonymous — it's one layer of privacy, not a guarantee."
  },
  {
    keywords: ["social engineering", "manipulation", "human hacking", "pretexting", "baiting"],
    answer: "Social engineering exploits human psychology rather than technical vulnerabilities.\n\n**Common techniques:**\n• **Phishing**: Fake emails/messages impersonating trusted entities\n• **Pretexting**: Creating a fabricated scenario to extract information\n• **Baiting**: Leaving infected USB drives or offering free downloads\n• **Tailgating**: Following authorized personnel into restricted areas\n• **Quid pro quo**: Offering a service in exchange for information\n\n**Defense:** Always verify identities through official channels, question urgency tactics, and never share sensitive information without verification."
  },
  {
    keywords: ["data breach", "data leak", "leaked data", "compromised data", "breach notification", "haveibeenpwned"],
    answer: "A data breach occurs when sensitive information is exposed without authorization.\n\n**What to do if your data is breached:**\n1. Change passwords on the affected service immediately\n2. Change passwords on any other site where you used the same one\n3. Enable 2FA on all accounts\n4. Monitor bank/credit card statements for unauthorized transactions\n5. Check haveibeenpwned.com to see if your email appears in known breaches\n6. Be vigilant against phishing attempts that may use your leaked data"
  },
  {
    keywords: ["wifi", "wi-fi", "public wifi", "wifi security", "wireless security", "hotspot"],
    answer: "**Public Wi-Fi security tips:**\n• Never access banking or sensitive accounts on public Wi-Fi\n• Use a VPN to encrypt your traffic\n• Disable auto-connect to open networks\n• Verify the network name with staff (attackers set up fake hotspots)\n• Turn off file sharing and AirDrop\n• Use HTTPS websites only (look for the padlock icon)\n• Forget the network after use\n\nAt home: Use WPA3 encryption, change default router passwords, and keep firmware updated."
  },
  {
    keywords: ["dark web", "darknet", "tor", "hidden services", "onion"],
    answer: "The dark web is a part of the internet only accessible through specialized software like Tor. While Tor itself is a legitimate privacy tool used by journalists and activists, the dark web also hosts illegal marketplaces selling stolen data, drugs, and malware.\n\n**Important:** Your stolen credentials from data breaches often end up on dark web forums. Use services like haveibeenpwned.com to check if your data has been compromised. Never attempt to purchase anything from dark web markets — it's both illegal and extremely risky."
  },
  {
    keywords: ["encryption", "encrypt", "encrypted", "end to end", "e2ee", "aes"],
    answer: "Encryption converts readable data into an coded format that can only be decoded with a specific key.\n\n**Types:**\n• **Symmetric** (AES-256): Same key encrypts and decrypts — used for file/disk encryption\n• **Asymmetric** (RSA): Public/private key pairs — used for secure communication\n• **End-to-End (E2EE)**: Only sender and receiver can read messages (Signal, WhatsApp)\n\n**Best practices:** Enable full-disk encryption (BitLocker/FileVault), use E2EE messaging apps, and always verify HTTPS on websites."
  },

  // ── Digital Hygiene ──
  {
    keywords: ["digital hygiene", "online safety", "internet safety", "stay safe online", "cyber hygiene", "protect myself"],
    answer: "**Essential digital hygiene checklist:**\n\n✅ Use strong, unique passwords with a manager\n✅ Enable 2FA on all accounts\n✅ Keep OS and apps updated\n✅ Use reputable antivirus software\n✅ Be cautious of unsolicited links and attachments\n✅ Review app permissions regularly\n✅ Back up important data (3-2-1 rule)\n✅ Use a VPN on public networks\n✅ Check privacy settings on social media\n✅ Monitor your accounts for unauthorized activity\n\nDigital hygiene is not a one-time task — it requires ongoing vigilance."
  },
  {
    keywords: ["privacy", "data privacy", "personal data", "privacy settings", "tracking", "cookies"],
    answer: "**Protecting your digital privacy:**\n• Review and tighten privacy settings on all social media\n• Use privacy-focused browsers (Firefox, Brave) or extensions (uBlock Origin, Privacy Badger)\n• Limit app permissions — deny access to camera, mic, and location unless needed\n• Use temporary/disposable email for sign-ups\n• Opt out of data broker sites\n• Read privacy policies (or use ToS;DR for summaries)\n• Disable ad personalization in Google/Meta/Apple settings\n• Use DNS-level blocking (NextDNS, Pi-hole) for tracker protection"
  },
  {
    keywords: ["social media", "instagram", "facebook", "twitter", "social media safety", "online presence"],
    answer: "**Social media safety tips:**\n• Set accounts to private unless you need a public presence\n• Don't share real-time location, travel plans, or personal documents\n• Be cautious accepting friend requests from strangers\n• Don't click shortened URLs from unknown sources\n• Enable login alerts and 2FA\n• Regularly audit connected third-party apps\n• Think before you post — content can be screenshot'd and shared\n• Be aware of social engineering via DMs\n\nRemember: anything posted online can potentially become permanent."
  },
  {
    keywords: ["children", "kids", "child safety", "parental control", "kids online", "child online"],
    answer: "**Keeping children safe online:**\n• Use parental controls and content filters\n• Educate children about not sharing personal information\n• Monitor online activity without being invasive — have open conversations\n• Teach them to recognize and report cyberbullying\n• Set screen time limits\n• Keep devices in common areas\n• Use child-safe browsers and YouTube Kids\n• Report CSAM to the National Center for Missing & Exploited Children or cybertipline.org\n\nIn India, report child exploitation to cybercrime.gov.in or call 1098 (CHILDLINE)."
  },
  {
    keywords: ["update", "software update", "patch", "windows update", "security update"],
    answer: "Software updates often contain critical security patches. Delaying updates leaves you vulnerable to known exploits.\n\n**Best practices:**\n• Enable automatic updates for your OS\n• Update browsers, apps, and plugins regularly\n• Don't ignore update notifications — many attacks target known, patched vulnerabilities\n• Update router firmware periodically\n• Replace software that's no longer receiving security updates\n\nThe WannaCry ransomware attack in 2017 exploited a Windows vulnerability that had been patched months before — victims simply hadn't updated."
  },

  // ── Misinformation & Fact-Checking ──
  {
    keywords: ["misinformation", "fake news", "disinformation", "false information", "propaganda"],
    answer: "**Understanding misinformation:**\n• **Misinformation**: False info shared without intent to harm (honest mistakes, rumors)\n• **Disinformation**: Deliberately fabricated or manipulated info designed to deceive\n• **Malinformation**: True info shared out of context to cause harm\n\n**How to combat it:**\n1. Verify claims before sharing (use TruthGuard's Analysis Hub)\n2. Check the source — is it a known, reputable outlet?\n3. Look for corroborating sources\n4. Be skeptical of emotional or sensational content\n5. Use reverse image search to verify photos\n6. Check fact-checking sites (AltNews, Snopes, PolitiFact)"
  },
  {
    keywords: ["fact check", "how to fact check", "verify information", "check if true", "is it true"],
    answer: "**How to fact-check a claim:**\n\n1. **Use TruthGuard**: Paste the claim into the Analysis Hub for AI-powered verification\n2. **Source check**: Trace the claim to its original source — is it a primary source?\n3. **Cross-reference**: Search for the claim across multiple trusted news outlets\n4. **Reverse image search**: Use Google Images or TinEye to verify photos\n5. **Check dates**: Old news often recirculates as 'breaking' stories\n6. **Expert verification**: See what domain experts say about the topic\n7. **Fact-check sites**: AltNews (India), Snopes, PolitiFact, FactCheck.org\n\nRemember: If something sounds too outrageous (or too perfect), it probably needs verification."
  },
  {
    keywords: ["ai generated", "ai content", "chatgpt", "ai text", "detect ai", "ai written"],
    answer: "AI-generated content is increasingly difficult to distinguish from human-created content.\n\n**Signs of AI-generated text:**\n• Overly polished, generic language without personal voice\n• Repetitive sentence structures\n• Lack of specific personal experiences or opinions\n• Factual errors stated with high confidence\n• Missing citations or vague source references\n\n**Signs of AI-generated images:**\n• Distorted hands, fingers, or text\n• Inconsistent reflections or shadows\n• Smooth, uncanny skin textures\n• Background inconsistencies\n\nUse TruthGuard's Deepfake Scanner for AI image detection."
  },
  {
    keywords: ["bias", "media bias", "confirmation bias", "echo chamber", "filter bubble"],
    answer: "**Understanding information bias:**\n• **Confirmation bias**: Tendency to favor information that confirms existing beliefs\n• **Echo chambers**: Social media algorithms show you content you already agree with\n• **Filter bubbles**: Personalized feeds that limit exposure to diverse viewpoints\n• **Anchoring bias**: Over-relying on the first piece of information encountered\n\n**How to counter bias:**\n1. Actively seek out opposing viewpoints\n2. Follow diverse news sources across the political spectrum\n3. Question why a story makes you feel strongly\n4. Use fact-checking tools like TruthGuard before sharing"
  },

  // ── Indian Cyber Law ──
  {
    keywords: ["cybercrime", "report cybercrime", "cyber crime", "report scam", "report fraud", "cyber complaint", "report online"],
    answer: "**Reporting cybercrime in India:**\n\n1. **National Cyber Crime Reporting Portal**: cybercrime.gov.in — File complaints online\n2. **Helpline**: Call 1930 (National Cyber Crime Helpline) immediately for financial fraud\n3. **Local Cyber Cell**: Visit your nearest police station's cyber cell\n4. **CERT-In**: cert-in.org.in for reporting security incidents\n5. **RBI**: Report banking fraud to your bank within the 'golden hour' (first few hours)\n\n**Preserve evidence:** Take screenshots, save emails/messages, note transaction IDs and timestamps. Do NOT delete any communication with the scammer."
  },
  {
    keywords: ["it act", "cyber law", "indian cyber law", "information technology act", "legal", "punishment"],
    answer: "**Key Indian cyber laws (IT Act 2000, amended 2008):**\n\n• **Section 43**: Unauthorized access, data theft — Compensation up to ₹1 crore\n• **Section 66**: Computer-related offenses — Up to 3 years imprisonment\n• **Section 66B**: Receiving stolen computer resources — Up to 3 years\n• **Section 66C**: Identity theft — Up to 3 years imprisonment\n• **Section 66D**: Cheating by impersonation using IT — Up to 3 years\n• **Section 66E**: Privacy violation (capturing images) — Up to 3 years\n• **Section 67**: Publishing obscene material — Up to 5 years\n• **Section 72**: Breach of confidentiality — Up to 2 years"
  },
  {
    keywords: ["online fraud", "upi fraud", "banking fraud", "money stolen", "scam call", "olx scam", "financial fraud"],
    answer: "**If you're a victim of online financial fraud:**\n\n1. **Immediately call 1930** (National Cyber Crime Helpline) — this can help freeze the fraudster's account\n2. Report to your bank to block the account/card\n3. File an FIR at your local police station\n4. Report on cybercrime.gov.in\n5. Save all evidence: transaction details, screenshots, phone numbers\n\n**Common scams to watch for:**\n• Fake UPI collect requests\n• Remote access app scams (AnyDesk/TeamViewer)\n• OTP sharing requests\n• Fake customer care numbers\n• Investment/crypto scams promising guaranteed returns"
  },
  {
    keywords: ["cyberbullying", "online harassment", "trolling", "cyber stalking", "stalking", "harassment"],
    answer: "**Dealing with cyberbullying and online harassment:**\n\n1. **Do not engage** — don't respond to the harasser\n2. **Document everything** — take screenshots with timestamps\n3. **Block and report** the account on the platform\n4. **Report to authorities**: File a complaint at cybercrime.gov.in\n5. **Legal recourse in India**: Section 66A (struck down but 67 applies), Section 354D (stalking), and Section 509 IPC\n\nIf you or someone you know is being harassed, reach out to cyber cells or helplines. Online harassment is a punishable offense."
  },

  // ── Common Questions ──
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "good afternoon"],
    answer: "Greetings! I'm the TruthGuard AI Assistant. I can help you with:\n\n• **Fact-checking** and claim verification\n• **Cybersecurity** guidance and best practices\n• **Digital safety** and privacy tips\n• **Misinformation** detection and awareness\n• **Navigating** the TruthGuard platform\n\nWhat would you like to know about?"
  },
  {
    keywords: ["thank", "thanks", "thank you", "appreciate", "helpful"],
    answer: "You're welcome! I'm glad I could help. Remember — staying vigilant online is a continuous practice. If you have more questions about cybersecurity, fact-checking, or digital safety, feel free to ask anytime. Stay safe! 🛡️"
  },
  {
    keywords: ["who are you", "what are you", "your name", "about you", "what can you do", "your purpose"],
    answer: "I'm the TruthGuard AI Assistant — your on-platform guide for cybersecurity, digital hygiene, and misinformation defense. I can help you:\n\n• Understand and navigate TruthGuard's tools (Analysis Hub, Deepfake Scanner, Network Graph, FIR Reports)\n• Answer cybersecurity questions (phishing, malware, passwords, 2FA, VPNs)\n• Guide you on reporting cybercrimes in India\n• Explain misinformation tactics and how to fact-check\n• Provide digital safety best practices\n\nI'm focused exclusively on these security and safety topics."
  },
  {
    keywords: ["bye", "goodbye", "see you", "exit", "quit", "close"],
    answer: "Goodbye! Stay cyber-safe out there. Remember the golden rules: verify before sharing, update your software, and never share OTPs. Come back anytime you need assistance! 🔒"
  },

  // ── Advanced / Specific Topics ──
  {
    keywords: ["sql injection", "xss", "cross site scripting", "injection attack", "web vulnerability"],
    answer: "**Common web application vulnerabilities:**\n\n• **SQL Injection**: Inserting malicious SQL code through input fields to access/modify databases. Prevention: Use parameterized queries and prepared statements.\n• **Cross-Site Scripting (XSS)**: Injecting malicious scripts into web pages viewed by other users. Prevention: Sanitize all user inputs and use Content Security Policy headers.\n• **CSRF**: Cross-Site Request Forgery — tricking users into executing unwanted actions. Prevention: Use anti-CSRF tokens.\n\nOWASP Top 10 is an excellent resource for understanding the most critical web security risks."
  },
  {
    keywords: ["zero day", "exploit", "vulnerability", "cve", "security flaw"],
    answer: "A zero-day vulnerability is a software flaw unknown to the vendor with no available patch. These are extremely dangerous because there's no defense until a fix is released.\n\n**Mitigation strategies:**\n• Keep all software updated to get patches as soon as they're available\n• Use intrusion detection/prevention systems (IDS/IPS)\n• Implement the principle of least privilege\n• Use application sandboxing\n• Monitor for unusual system behavior\n• Subscribe to security advisories (CVE databases, CERT-In alerts)"
  },
  {
    keywords: ["blockchain", "cryptocurrency", "bitcoin", "crypto scam", "crypto fraud"],
    answer: "**Cryptocurrency safety:**\n\n⚠️ **Common crypto scams:**\n• Fake investment platforms promising guaranteed returns\n• Pump-and-dump schemes on new tokens\n• Phishing sites mimicking exchanges\n• Fake celebrity endorsement schemes\n• Rug pulls in DeFi projects\n\n**Stay safe:**\n• Never invest more than you can afford to lose\n• Use only established exchanges (with 2FA)\n• Never share private keys or seed phrases\n• Be extremely skeptical of 'guaranteed returns'\n• Verify smart contracts before interacting\n\nIn India, report crypto fraud at cybercrime.gov.in."
  },
  {
    keywords: ["identity theft", "stolen identity", "identity fraud", "someone using my name", "impersonation"],
    answer: "**If you suspect identity theft:**\n\n1. **Report immediately**: File an FIR and report at cybercrime.gov.in\n2. **Freeze credit/accounts**: Contact your bank to freeze suspicious accounts\n3. **Change passwords**: Update all online account passwords\n4. **Monitor accounts**: Check bank statements and credit reports regularly\n5. **Alert contacts**: Inform friends/family that your identity may be compromised\n\n**Prevention:**\n• Don't share Aadhaar/PAN details unnecessarily\n• Shred physical documents\n• Use unique passwords per site\n• Enable transaction alerts on all bank accounts"
  },
  {
    keywords: ["scam", "online scam", "how to know scam", "is this a scam", "spot a scam", "detect scam"],
    answer: "**Red flags that indicate a scam:**\n\n🚩 Unsolicited contact (you didn't initiate)\n🚩 Too-good-to-be-true offers or returns\n🚩 Urgency or pressure tactics ('Act now or lose!')\n🚩 Requests for upfront payment or OTPs\n🚩 Poor grammar and unprofessional communication\n🚩 Requests to install remote access apps\n🚩 Asking you to pay through gift cards or crypto\n🚩 Fake authority claims (fake CBI/RBI/Court notices)\n\n**Rule of thumb:** If someone contacts you asking for money or personal info, verify through official channels independently."
  },
  {
    keywords: ["safe link", "check link", "url safe", "suspicious link", "link check", "scan url", "check url", "website safe"],
    answer: "To check if a link is safe:\n\n1. **Use TruthGuard**: Paste the URL into the 'Scan URL' tab on the Analysis Hub\n2. **Inspect the URL manually**: Look for misspelled domains, extra characters, or suspicious TLDs\n3. **Use VirusTotal**: virustotal.com scans URLs against 70+ security engines\n4. **Google Safe Browsing**: transparencyreport.google.com/safe-browsing\n5. **Check HTTPS**: Look for the padlock icon (though scam sites can also use HTTPS)\n\n⚠️ Never click shortened URLs from unknown sources. Use a URL expander to reveal the full destination first."
  },
  {
    keywords: ["backup", "data backup", "backup data", "recover data", "data recovery", "lost files"],
    answer: "**The 3-2-1 Backup Rule:**\n• Keep **3** copies of your data\n• Store on **2** different types of media\n• Keep **1** copy offsite (cloud)\n\n**Recommended approach:**\n• Use cloud backup (Google Drive, OneDrive, iCloud)\n• Keep a local external hard drive backup\n• For critical data, use an encrypted offsite backup\n• Automate backups — don't rely on manual copies\n• Test your backups periodically to ensure they work\n\nBackups are your best defense against ransomware, hardware failure, and accidental deletion."
  },
  {
    keywords: ["firewall", "antivirus", "security software", "endpoint security", "windows defender"],
    answer: "**Essential security software:**\n\n• **Firewall**: Monitors incoming/outgoing network traffic. Windows Firewall is built-in and decent; enable it.\n• **Antivirus**: Windows Defender is excellent for most users. For extra protection, consider Malwarebytes or Bitdefender.\n• **Anti-malware**: Run periodic scans with Malwarebytes (free version)\n\n**Tips:**\n• Keep security software definitions updated\n• Run full system scans weekly\n• Don't disable Windows Defender for pirated software\n• Use browser extensions like uBlock Origin for ad/malware blocking"
  },
  {
    keywords: ["iot", "smart device", "smart home", "alexa", "google home", "smart tv", "internet of things"],
    answer: "**Securing IoT/Smart devices:**\n\n• Change default passwords on ALL devices (cameras, routers, smart speakers)\n• Keep firmware updated\n• Segment IoT devices on a separate network/VLAN\n• Disable features you don't use (remote access, UPnP)\n• Research before buying — choose brands with good security track records\n• Review what data your devices collect and share\n\n⚠️ Cheap, no-name IoT devices are often riddled with vulnerabilities and may send data to unknown servers."
  },
  {
    keywords: ["email security", "secure email", "email privacy", "email tips"],
    answer: "**Email security best practices:**\n\n• Enable 2FA on your email account\n• Don't click links in emails — type URLs manually\n• Verify sender addresses carefully\n• Don't open unexpected attachments\n• Use encrypted email (ProtonMail, Tutanota) for sensitive communications\n• Be wary of 'urgent' emails asking you to take immediate action\n• Check email forwarding rules regularly — attackers sometimes add auto-forwarding\n• Use different emails for different purposes (personal, shopping, registrations)"
  },
  {
    keywords: ["mobile security", "phone security", "android security", "iphone security", "app security", "phone hacked"],
    answer: "**Mobile device security:**\n\n• Only install apps from official stores (Google Play, App Store)\n• Review app permissions — deny unnecessary access\n• Keep your OS updated\n• Use screen lock (biometrics + strong PIN)\n• Enable remote wipe capability (Find My iPhone/Google Find My Device)\n• Don't root/jailbreak your device\n• Be cautious with public charging stations (use a charge-only cable)\n• Install a mobile security app\n• Regularly review which apps have access to your location, camera, and contacts"
  },
];

export function getLocalAnswer(question: string): string | null {
  const q = question.toLowerCase().trim();

  if (!q || q.length < 2) return null;

  let bestMatch: { entry: KBEntry; score: number } | null = null;

  for (const entry of knowledgeBase) {
    let score = 0;
    const qWords = q.split(/\s+/);

    for (const keyword of entry.keywords) {
      const kLower = keyword.toLowerCase();

      if (q === kLower) {
        score += 100;
      } else if (q.includes(kLower)) {
        score += 50 + (kLower.length / q.length) * 30;
      } else {
        const keywordWords = kLower.split(/\s+/);
        let wordMatchCount = 0;
        for (const kw of keywordWords) {
          if (kw.length >= 3 && qWords.some(w => w.includes(kw) || kw.includes(w))) {
            wordMatchCount++;
          }
        }
        if (keywordWords.length > 0) {
          const ratio = wordMatchCount / keywordWords.length;
          if (ratio >= 0.5) {
            score += 20 * ratio + wordMatchCount * 5;
          }
        }
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { entry, score };
    }
  }

  if (bestMatch && bestMatch.score >= 10) {
    return bestMatch.entry.answer;
  }

  return null;
}
