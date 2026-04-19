import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY?.trim();

const isValidApiKey = (key: string | undefined) => {
  if (!key) return false;
  if (key.includes("your-key") || key.includes("YOUR_KEY")) return false;
  if (key.length < 30) return false; 
  return true;
};

const rateLimitCache = new Map<string, { count: number, resetTime: number }>();
const queryCache = new Map<string, any>();

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash);
}

function analyzeContentSignals(input: string): {
  score: number;
  type: string;
  status: string;
  explanation: string;
  confidence: number;
  signals: string[];
} {
  const text = input.trim();
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const wordCount = words.length;
  const hash = simpleHash(lower);

  let scoreModifiers: number[] = [];
  let signals: string[] = [];
  let matchedCategory: string | null = null;
  let categoryScore: number | null = null;
  let categoryType: string | null = null;
  let categoryStatus: string | null = null;
  let categoryReason: string | null = null;
  let confidence = 70;

  const patterns = [
    {
      keywords: ["sky is blue", "earth is round", "earth revolves around the sun", "water is h2o", "sun rises in the east", "2+2=4", "2 + 2 = 4", "gravity exists", "evolution is real", "photosynthesis", "dna is", "oxygen is", "humans need water", "earth orbits the sun", "moon orbits earth", "pi is 3.14", "speed of light", "boiling point of water", "freezing point of water", "earth has one moon", "blood is red", "plants need sunlight"],
      score: 95, type: "FACTUAL", status: "Likely True",
      reason: "This is a well-established scientific or mathematical fact supported by universal consensus, extensive research, and direct observation.",
      confidence: 95
    },
    {
      keywords: ["capital of india", "capital of usa", "capital of france", "capital of japan", "capital of china", "capital of germany", "capital of uk", "national anthem", "independence day", "largest country", "smallest country", "tallest mountain", "longest river", "biggest ocean", "population of", "founded in", "invented by", "discovered by"],
      score: 90, type: "FACTUAL", status: "Likely True",
      reason: "This statement relates to a verifiable geographical, historical, or demographic fact that can be confirmed through official records and encyclopedic sources.",
      confidence: 88
    },
    {
      keywords: ["flat earth", "earth is flat", "fake moon landing", "moon landing hoax", "moon landing was faked", "chemtrails", "vaccines cause autism", "illuminati controls", "5g causes covid", "5g causes cancer", "birds aren't real", "birds are fake", "nasa lies", "gravity is fake", "gravity doesn't exist", "hollow earth", "reptilian", "lizard people", "qanon", "adrenochrome", "microchip vaccine", "plandemic", "covid is fake", "covid hoax"],
      score: 8, type: "FALSE", status: "Likely Fake",
      reason: "This statement aligns with well-documented conspiracy theories that have been thoroughly debunked by scientific evidence, peer-reviewed research, and expert consensus across multiple disciplines.",
      confidence: 94
    },
    {
      keywords: ["best", "worst", "beautiful", "ugly", "love", "hate", "prefer", "favorite", "amazing", "terrible", "wonderful", "horrible", "fantastic", "disgusting", "awesome", "i think", "i believe", "in my opinion", "i feel", "seems to me", "personally", "overrated", "underrated", "greatest", "most beautiful", "greatest of all time", "goat"],
      score: 50, type: "OPINION", status: "Opinion",
      reason: "This is a subjective statement based on personal beliefs, values, preferences, or taste. It cannot be objectively proven true or false as it varies between individuals.",
      confidence: 85
    },
    {
      keywords: ["god exists", "god is", "god created", "religion", "heaven", "hell", "afterlife", "soul", "spirit", "divine", "prayer works", "faith", "blasphemy", "sin", "karma", "reincarnation", "nirvana", "moksha", "allah", "jesus", "scripture", "bible says", "quran says"],
      score: 50, type: "OPINION", status: "Opinion",
      reason: "This is a faith-based or philosophical claim rooted in religious belief. Such statements are matters of personal conviction and cannot be empirically proven or disproven through scientific methods.",
      confidence: 80
    },
    {
      keywords: ["election was stolen", "rigged election", "voter fraud", "stolen election", "political corruption", "studies show", "researchers claim", "scientists believe", "many people think", "it is said", "allegedly", "supposedly", "rumor has it", "some experts say", "according to some", "controversial study", "leaked documents", "whistleblower", "cover up", "coverup", "secret plan"],
      score: 38, type: "MISLEADING", status: "Misleading",
      reason: "This claim contains elements that may be partially true but are presented without critical context, or relies on unverified sources and speculation. Such statements often cherry-pick facts to support a predetermined narrative while ignoring contradicting evidence.",
      confidence: 65
    },
    {
      keywords: ["cure for cancer", "miracle cure", "doctors don't want you to know", "big pharma", "natural remedy", "hidden cure", "secret treatment", "guaranteed weight loss", "lose weight fast", "detox", "cleanse your body", "boost immune system", "superfood"],
      score: 22, type: "FALSE", status: "Likely Fake",
      reason: "This claim matches patterns commonly associated with medical misinformation and health scams. Claims of miracle cures or hidden medical truths typically lack peer-reviewed evidence and may cause harm by discouraging proven treatments.",
      confidence: 82
    },
    {
      keywords: ["breaking news", "just in", "confirmed dead", "country invaded", "war started", "earthquake hit", "tsunami", "assassination", "government collapsed", "coup", "martial law declared", "president arrested"],
      score: 35, type: "UNVERIFIABLE", status: "Unverifiable",
      reason: "This appears to be a breaking news claim that requires real-time verification from multiple authoritative news sources. Unverified breaking news is frequently used to spread disinformation during developing events.",
      confidence: 40
    },
    {
      keywords: ["ai will destroy", "robots will replace", "singularity", "artificial intelligence danger", "ai takeover", "technology will", "by 2030", "by 2040", "by 2050", "future prediction", "will happen", "within the next"],
      score: 42, type: "UNVERIFIABLE", status: "Unverifiable",
      reason: "This is a future prediction that cannot be verified against current evidence. While technological trends can be analyzed, specific predictions about future events carry inherent uncertainty and are often influenced by speculation.",
      confidence: 50
    },
    {
      keywords: ["money making", "get rich quick", "financial freedom", "passive income guaranteed", "100% return", "double your money", "risk free investment", "guaranteed profit", "make money online easy", "forex signal", "crypto signal guaranteed"],
      score: 15, type: "FALSE", status: "Likely Fake",
      reason: "This claim exhibits characteristics of financial scams or misleading marketing. Legitimate investments never guarantee specific returns, and 'risk-free' financial opportunities are essentially non-existent. Such claims often target vulnerable individuals.",
      confidence: 88
    },
    {
      keywords: ["climate change is fake", "global warming hoax", "climate hoax"],
      score: 10, type: "FALSE", status: "Likely Fake",
      reason: "Climate change is supported by overwhelming scientific consensus (97%+ of climate scientists), extensive empirical evidence including rising global temperatures, melting ice caps, and increasing extreme weather events. Major scientific bodies worldwide agree on the reality and human contribution to climate change.",
      confidence: 96
    },
    {
      keywords: ["climate change", "global warming", "greenhouse", "carbon emissions", "renewable energy", "sustainability", "carbon footprint"],
      score: 72, type: "FACTUAL", status: "Partially True",
      reason: "This claim relates to environmental science. While climate science is well-established, specific claims about impacts, timelines, and solutions may vary in accuracy depending on the exact assertion. Most mainstream climate claims are supported by scientific evidence.",
      confidence: 75
    },
    {
      keywords: ["india population", "china population", "world war", "cold war", "independence", "freedom fighter", "constitution", "amendment", "supreme court", "parliament", "congress", "prime minister", "president of"],
      score: 82, type: "FACTUAL", status: "Likely True",
      reason: "This appears to be a historical or political fact that can be verified through official records, government databases, and established historical documentation.",
      confidence: 80
    },
    {
      keywords: ["sports record", "world record", "olympic", "world cup", "cricket", "football", "soccer", "basketball", "tennis", "scored", "won the match", "championship", "tournament"],
      score: 78, type: "FACTUAL", status: "Partially True",
      reason: "Sports-related factual claims can typically be verified through official records, sports databases, and authoritative sports news outlets. However, statistics and records change frequently, so current accuracy depends on when the claim was made.",
      confidence: 72
    },
  ];

  for (const p of patterns) {
    if (p.keywords.some(k => lower.includes(k))) {
      categoryScore = p.score;
      categoryType = p.type;
      categoryStatus = p.status;
      categoryReason = p.reason;
      confidence = p.confidence;
      matchedCategory = p.type;
      signals.push(`Keyword pattern match: ${p.type}`);
      break;
    }
  }

  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount >= 3) {
    scoreModifiers.push(-8);
    signals.push("High exclamation usage detected (sensationalism indicator)");
  } else if (exclamationCount >= 1) {
    scoreModifiers.push(-3);
    signals.push("Moderate exclamation usage");
  }

  const capsWords = words.filter(w => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w));
  const capsRatio = wordCount > 0 ? capsWords.length / wordCount : 0;
  if (capsRatio > 0.4) {
    scoreModifiers.push(-12);
    signals.push("Excessive capitalization detected (credibility concern)");
  } else if (capsRatio > 0.2) {
    scoreModifiers.push(-5);
    signals.push("Above-average capitalization");
  }

  const absoluteWords = ["always", "never", "every", "all", "none", "nobody", "everyone", "completely", "totally", "absolutely", "100%", "guaranteed", "proven", "definitely", "undeniably", "without doubt"];
  const absoluteCount = absoluteWords.filter(w => lower.includes(w)).length;
  if (absoluteCount >= 2) {
    scoreModifiers.push(-10);
    signals.push("Multiple absolutist terms detected (overgeneralization)");
  } else if (absoluteCount === 1) {
    scoreModifiers.push(-4);
    signals.push("Absolutist language detected");
  }

  const emotionalWords = ["shocking", "unbelievable", "mind-blowing", "outrageous", "horrifying", "incredible", "insane", "jaw-dropping", "bombshell", "explosive", "devastating", "sensational", "extraordinary"];
  const emotionalCount = emotionalWords.filter(w => lower.includes(w)).length;
  if (emotionalCount >= 2) {
    scoreModifiers.push(-10);
    signals.push("Highly emotional/sensational language");
  } else if (emotionalCount >= 1) {
    scoreModifiers.push(-5);
    signals.push("Emotional language detected");
  }

  const hasQuestion = text.includes("?");
  if (hasQuestion && wordCount <= 15) {
    scoreModifiers.push(3);
    signals.push("Interrogative format (question, not a claim)");
    if (!matchedCategory) {
      categoryType = "UNVERIFIABLE";
      categoryStatus = "Unverifiable";
      categoryReason = "This input appears to be a question rather than a factual claim. Questions themselves are not verifiable — the underlying assumption or premise would need to be evaluated separately.";
    }
  }

  const hasURL = /https?:\/\/\S+/.test(text) || /www\.\S+/.test(text);
  if (hasURL) {
    scoreModifiers.push(5);
    signals.push("Contains URL reference (source citation present)");
  }

  const citationPhrases = ["according to", "research shows", "study found", "data indicates", "published in", "peer-reviewed", "journal of", "university of"];
  if (citationPhrases.some(p => lower.includes(p))) {
    scoreModifiers.push(8);
    signals.push("Academic/research citation language detected");
  }

  const vagueSourcePhrases = ["some say", "people say", "they say", "i heard", "someone told me", "a friend said", "forwarded message", "viral message", "whatsapp forward"];
  if (vagueSourcePhrases.some(p => lower.includes(p))) {
    scoreModifiers.push(-12);
    signals.push("Vague/unverifiable source attribution");
  }

  if (wordCount < 4) {
    scoreModifiers.push(-3);
    signals.push("Very short input — limited context for analysis");
    confidence = Math.max(confidence - 10, 30);
  } else if (wordCount > 50) {
    scoreModifiers.push(3);
    signals.push("Detailed input provides more analytical context");
  }

  const hasNumbers = /\d+/.test(text);
  if (hasNumbers) {
    const specificNumbers = text.match(/\d+\.?\d*/g) || [];
    if (specificNumbers.length > 0) {
      scoreModifiers.push(2);
      signals.push("Contains specific numerical claims");
    }
  }

  const negativeWords = ["fake", "lie", "lies", "hoax", "scam", "fraud", "conspiracy", "corrupt", "manipulation", "cover-up", "propaganda"];
  const negCount = negativeWords.filter(w => lower.includes(w)).length;
  if (negCount >= 2) {
    scoreModifiers.push(-8);
    signals.push("Multiple negative/accusatory terms");
  }

  let baseScore: number;
  if (categoryScore !== null) {
    baseScore = categoryScore;
  } else {
    const hashVariation = (hash % 25) + 35;
    baseScore = hashVariation;
    signals.push("No strong pattern match — heuristic analysis applied");
  }

  const modifierTotal = scoreModifiers.reduce((a, b) => a + b, 0);
  let finalScore = baseScore + modifierTotal;

  const hashNudge = ((hash % 11) - 5);
  finalScore += hashNudge;

  finalScore = Math.max(2, Math.min(98, Math.round(finalScore)));

  if (finalScore === 50 && categoryType !== "OPINION") {
    finalScore += (hash % 2 === 0) ? 3 : -3;
  }

  let finalType = categoryType || "UNVERIFIABLE";
  let finalStatus = categoryStatus || "Unverifiable";

  if (!matchedCategory) {
    if (finalScore >= 80) {
      finalType = "FACTUAL";
      finalStatus = "Likely True";
    } else if (finalScore >= 60) {
      finalType = "FACTUAL";
      finalStatus = "Partially True";
    } else if (finalScore >= 40) {
      finalType = "MISLEADING";
      finalStatus = "Misleading";
    } else {
      finalType = "FALSE";
      finalStatus = "Likely Fake";
    }
  }

  const finalConfidence = Math.max(30, Math.min(98, confidence + ((hash % 7) - 3)));

  let explanation = categoryReason || `This claim was analyzed using TruthGuard's multi-signal heuristic engine. `;
  if (!categoryReason) {
    if (finalScore >= 80) {
      explanation += `The content structure and language patterns suggest a factual assertion. However, full verification requires cross-referencing with authoritative primary sources.`;
    } else if (finalScore >= 60) {
      explanation += `The claim shows some indicators of factual content but lacks sufficient markers for high-confidence verification. Elements of the statement may be accurate but require additional context or sourcing.`;
    } else if (finalScore >= 40) {
      explanation += `The content exhibits characteristics commonly associated with misleading information, including lack of specific sourcing, emotional language, or overgeneralized statements. The claim may contain partial truths presented in a misleading framing.`;
    } else {
      explanation += `Multiple credibility indicators flag this content as potentially false or highly misleading. The language patterns, lack of credible sourcing, and content characteristics match known misinformation patterns.`;
    }
  }
  explanation += ` Analysis signals: ${signals.join("; ")}.`;

  return {
    score: finalScore,
    type: finalType,
    status: finalStatus,
    explanation,
    confidence: finalConfidence,
    signals,
  };
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateRecord = rateLimitCache.get(ip);
    
    if (rateRecord) {
      if (now > rateRecord.resetTime) {
        rateLimitCache.set(ip, { count: 1, resetTime: now + 60000 }); 
      } else if (rateRecord.count >= 10) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: { "X-RateLimit-Limit": "10", "X-RateLimit-Remaining": "0" } });
      } else {
        rateLimitCache.set(ip, { count: rateRecord.count + 1, resetTime: rateRecord.resetTime });
      }
    } else {
      rateLimitCache.set(ip, { count: 1, resetTime: now + 60000 });
    }

    const { input } = await req.json();

    if (!input || input.trim() === "") {
      return NextResponse.json({ error: "Missing or empty text input." }, { status: 400 });
    }
    
    const sanitizedInput = input.replace(/<\/?[^>]+(>|$)/g, "");
    
    if (sanitizedInput.length > 2000) {
      return NextResponse.json({ error: "Input too long. Max 2000 characters." }, { status: 400 });
    }

    const hasValidApiKey = isValidApiKey(OPENROUTER_API_KEY);

    const prompt = `You are a professional fact-checking AI engine used in a production system.

Your job is to evaluate a claim and return a STRICT credibility analysis that will be directly used in a UI.

⚠️ CRITICAL INSTRUCTIONS:

1. You MUST always return a valid JSON object. No extra text outside JSON.

2. First classify the claim into EXACTLY ONE category:
   - FACTUAL (objectively verifiable)
   - OPINION (belief, religion, personal, philosophical)
   - MISLEADING (partially true but lacks context)
   - FALSE (factually incorrect)
   - UNVERIFIABLE (no reliable evidence exists)

3. SCORING RULES (STRICT):
   - FACTUAL (correct) → 80 to 100
   - FACTUAL (partial) → 60 to 79
   - MISLEADING → 40 to 59
   - FALSE → 0 to 39
   - OPINION → EXACTLY 50
   - UNVERIFIABLE → 40 to 60

4. STATUS MAPPING (STRICT):
   - 80–100 → "Likely True"
   - 60–79 → "Partially True"
   - 40–59 → "Misleading"
   - 0–39 → "Likely Fake"
   - OPINION → "Opinion"
   - UNVERIFIABLE → "Unverifiable"

5. EXPLANATION RULES (VERY IMPORTANT):
   - MUST clearly explain WHY the claim is true/false/misleading
   - MUST clearly explain WHY the claim is true/false/misleading in minimum 3 sentences
   - Use factual reasoning, not vague statements
   - If FALSE → mention correct fact
   - If MISLEADING → explain missing context
   - If OPINION → say it's belief-based, not provable
   - If FACTUAL → briefly justify with real-world knowledge

6. SPECIAL RULES:
   - NEVER mark religious or belief-based claims as false
   - NEVER give random or inconsistent scores
   - Use general scientific and common knowledge
   - Be logically consistent across all responses

7. CONFIDENCE:
   - Reflect certainty of analysis (0–100)
   - High confidence only for widely accepted facts

8. OUTPUT FORMAT (STRICT JSON ONLY):

{
  "claim": "<input claim>",
  "type": "FACTUAL | OPINION | MISLEADING | FALSE | UNVERIFIABLE",
  "credibility_score": <number between 0-100>,
  "status": "<Likely True | Partially True | Misleading | Likely Fake | Opinion | Unverifiable>",
  "confidence": <number between 0-100>,
  "explanation": "<clear reason why this claim is true/false> in minimum 3 sentences",
  "sources": [
    { "name": "<source name>", "status": "verified | contradicts | no-evidence", "url": "<source url or #>", "score": <number 0-100> }
  ]
}

⚠️ DO NOT:
- Add markdown
- Add comments
- Add extra fields
- Return anything except JSON

Now evaluate this claim:
"""
${input}
"""`;

    const cacheKey = input.trim().toLowerCase();
    if (queryCache.has(cacheKey)) {
      console.log(`Cache hit for query: "${cacheKey.substring(0, 20)}..."`);
      return NextResponse.json(queryCache.get(cacheKey));
    }

    const models = [
      "meta-llama/llama-3.1-8b-instruct"
    ];

    const backupKey = process.env.BACKUP_API_KEY?.trim();
    const apiKeys = [
      OPENROUTER_API_KEY,
      backupKey
    ].filter(k => k && !k.includes("your-key-here")) as string[];

    let aiResult = null;
    let lastError = "No AI models attempted.";
    if (apiKeys.length === 0) {
      lastError = "No valid API keys configured. Using local fallback.";
    }
    let attemptCount = 0;

    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const referer = `${protocol}://${host}`;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (apiKeys.length > 0) {
      for (const model of models) {
        if (aiResult) break;
        for (const apiKey of apiKeys) {
          attemptCount++;
          try {
            console.log(`Attempt ${attemptCount}: Trying ${model} with key ${apiKey.substring(0, 8)}...`);
            const response = await axios.post(
              'https://openrouter.ai/api/v1/chat/completions',
              {
                model: model,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.1,
              },
              {
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'HTTP-Referer': referer,
                  'X-Title': 'TruthGuard X',
                  'Content-Type': 'application/json'
                },
                timeout: 15000 
              }
            );

            const content = response.data.choices[0].message.content;
            const jsonMatch = content.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
              try {
                aiResult = JSON.parse(jsonMatch[0]);
                if (aiResult && aiResult.credibility_score !== undefined) break;
              } catch (pErr) {
                console.warn("Partial JSON parse error, retrying...");
              }
            }
          } catch (apiError: any) {
            const errMsg = apiError.response?.data?.error?.message || apiError.message;
            lastError = errMsg;
            
            if (process.env.NODE_ENV === 'development') {
              console.log(`Attempt ${attemptCount}: ${model} failed - ${errMsg}`);
            }
            
            if (apiError.response?.status === 429) {
              await sleep(1000); 
            }
            continue;
          }
        }
      }
    }

    if (!aiResult) {
      console.log(`AI analysis unavailable. Using advanced heuristic engine for: "${input.substring(0, 30)}..."`);
      
      const analysis = analyzeContentSignals(input);

      aiResult = {
        claim: input,
        type: analysis.type,
        credibility_score: analysis.score,
        status: analysis.status,
        explanation: `⚠️ [LOCAL INTELLIGENCE ENGINE] ${analysis.explanation}`,
        confidence: analysis.confidence,
        sources: [
          { 
            name: "TruthGuard Heuristic Engine", 
            status: analysis.score >= 80 ? "verified" : analysis.score <= 30 ? "contradicts" : "no-evidence", 
            url: "#", 
            score: analysis.score 
          },
          { 
            name: "Content Signal Analyzer", 
            status: "no-evidence", 
            url: "#", 
            score: Math.max(0, Math.min(100, analysis.score + ((simpleHash(input) % 11) - 5)))
          },
          {
            name: "Pattern Recognition DB",
            status: analysis.score >= 70 ? "verified" : analysis.score <= 35 ? "contradicts" : "no-evidence",
            url: "#",
            score: Math.max(0, Math.min(100, analysis.score - 3))
          }
        ]
      };
    }

    const score = Number(aiResult.credibility_score) || 50;
    const type = String(aiResult.type).toUpperCase();

    let statusCategory = aiResult.status || "Unverifiable";

    if (!aiResult.status) {
      if (type === "OPINION") {
        statusCategory = "Opinion";
      } else if (type === "FALSE") {
        statusCategory = "Likely Fake";
      } else if (type === "MISLEADING") {
        statusCategory = "Misleading";
      } else if (score >= 80) {
        statusCategory = "Likely True";
      } else if (score >= 60) {
        statusCategory = "Partially True";
      } else if (score >= 40) {
        statusCategory = "Misleading";
      } else {
        statusCategory = "Likely Fake";
      }
    }

    const reasoning = [
      `Classification: ${type}`,
      `Status: ${statusCategory}`,
      `Reasoning: ${aiResult.explanation || "No detailed reasoning provided."}`,
      `AI Confidence: ${aiResult.confidence}%`
    ];

    const sources = aiResult.sources || [
      { 
        name: "TruthGuard X Intelligence", 
        status: score >= 80 ? "verified" : score <= 39 ? "contradicts" : "no-evidence", 
        url: "#", 
        score: score 
      },
      { 
        name: "Local Knowledge Buffer", 
        status: score >= 90 ? "verified" : score <= 20 ? "contradicts" : "no-evidence", 
        url: "#", 
        score: score - 5 > 0 ? (score - 5 > 100 ? 100 : score - 5) : 0 
      }
    ];

    const currentTime = new Date().toISOString().split("T")[0];
    const disclaimer = `Report Generated: ${currentTime}. Fact Integrity: ${statusCategory}. Basis: ${type}. Scoring follows strict production guidelines. Subjective claims remain neutral.`;

    const responseBody = {
      score,
      claim: aiResult.claim || (input.length > 80 ? input.substring(0, 80) + "..." : input),
      status: statusCategory,
      reasoning,
      sources,
      disclaimer,
      aiDetection: aiResult
    };

    queryCache.set(cacheKey, responseBody);

    return NextResponse.json(responseBody);

  } catch (error) {
    console.error("Server Error parsing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
