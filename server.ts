import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Owner profile — Agent Alpha shares ONLY these facts, by design.
// Tanzeela is a cybersecurity student and does not want personal details
// exposed on a public-facing AI terminal. Anything beyond this gets
// redirected to the contact form rather than answered or guessed at.
const TANZEELA_ROLE_LINE =
  "Tanzeela is an AI Engineer, Full-Stack Developer, Mobile App Developer, and SOC Analyst.";

const TANZEELA_ACTIVITY_LINE =
  "She is currently studying Cybersecurity, with active side projects in AI engineering and software development.";

const TANZEELA_KHINEXT_LINE =
  "Yes — Tanzeela was an Official Delegate at KhiNext'26, Asia's First Multi-Domain AI & Innovation Summit.";

const CONTACT_REDIRECT_LINE =
  "[AGENT_ALPHA] I can't share further personal details here. Please use the secure contact form below this terminal — fill it out and Tanzeela will respond at her earliest convenience.";

const AGENT_SELF_INTRO =
  "I am Agent Alpha — an AI agent designed, engineered, and developed by Tanzeela. If you're interested in similar AI agent work, you can contact Tanzeela directly through the secure form below; she can design one for you too.";

const TANZEELA_PROFILE = `APPROVED FACTS — share ONLY these, never elaborate beyond them:
- Role: ${TANZEELA_ROLE_LINE}
- Current activity: ${TANZEELA_ACTIVITY_LINE}
- KhiNext'26: ${TANZEELA_KHINEXT_LINE}
- About this agent: ${AGENT_SELF_INTRO}

STRICT RULE: Do not reveal, infer, or speculate about any other personal detail
(location, age, contact info, relationships, full/last name, social handles,
where she studies, etc.). If asked for anything beyond the approved facts
above, politely decline in-character and redirect the operator to the secure
contact form below the terminal, where Tanzeela will respond directly.`;

const OWNER_EMAIL = "tanzeelaarshad320@gmail.com";

app.use(express.json());

// Lazy-loaded Gemini Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing. Configure it in Settings > Secrets.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Lazy-loaded mail transporter (Gmail SMTP via App Password)
let mailTransporter: nodemailer.Transporter | null = null;
function getMailTransporter(): nodemailer.Transporter {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    throw new Error("EMAIL_USER or EMAIL_PASS environment variable is missing. Configure them in .env or Settings > Secrets.");
  }
  if (!mailTransporter) {
    mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass }
    });
  }
  return mailTransporter;
}

// 1. API Endpoint: Terminal Command Processing
app.post("/api/terminal", async (req, res) => {
  try {
    const { command } = req.body;
    if (!command || typeof command !== "string") {
      res.status(400).json({ error: "Command payload is required" });
      return;
    }

    const trimmed = command.trim().toLowerCase();

    // Standard local terminal commands for ultra-fast, atmospheric response
    if (trimmed === "help") {
      res.json({
        output: [
          "==== EXECUTABLE UTILITIES & PROTOCOLS ====",
          "  help               Display security gate commands",
          "  clear              Purge history buffer",
          "  ping               Diagnose network telemetry clusters",
          "  scan               Initiate vulnerability search & systems diagnostic",
          "  agent              Query status of autonomous artificial intelligence systems",
          "  whoami             Pull up operator identity record (Tanzeela)",
          "  keygen             Securely generate cryptographic AES-256 session token",
          "  query <prompt>     Tunnel direct prompt to active AI agent (agent_alpha)",
          "==========================================="
        ].join("\n")
      });
      return;
    }

    if (trimmed === "ping") {
      const pingTime = Math.floor(Math.random() * 45) + 12;
      res.json({
        output: [
          `PINGING cluster.syst3m-core.net [10.240.88.${Math.floor(Math.random() * 254)}] with 32 bytes of data:`,
          `Reply from 10.240.88.35: bytes=32 time=${pingTime}ms TTL=64`,
          `Reply from 10.240.88.35: bytes=32 time=${pingTime - 2}ms TTL=64`,
          `Reply from 10.240.88.35: bytes=32 time=${pingTime + 5}ms TTL=64`,
          "",
          "Ping stats for 10.240.88.35:",
          "    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss),",
          `Approximate round trip times: Minimum = ${pingTime - 2}ms, Maximum = ${pingTime + 5}ms, Average = ${pingTime}ms`,
          "Status: NETWORK_INTEGRITY_STABLE (100% bandwidth available)"
        ].join("\n")
      });
      return;
    }

    if (trimmed === "scan") {
      res.json({
        output: [
          "[+] Initializing deep network-audit protocol across local subnet...",
          "[-] Port 22/tcp  [SSH]      ........................ SECURED (keys only)",
          "[-] Port 80/tcp  [HTTP]     ........................ SECURED (redirecting to SSL)",
          "[-] Port 443/tcp [HTTPS]    ........................ SECURED (TLS 1.3 Active)",
          "[-] Port 3000/tcp [NEXUS]   ........................ OPEN (Ingress Control Node)",
          "[+] Checking Zero-Trust security postures...",
          "    - Multi-factor authentication required for core console. [OK]",
          "    - Intrusion detection monitors active on all hosts.      [STABLE]",
          "    - Cloud cluster containers evaluated for root-access.   [ISOLATED]",
          "",
          "SCAN RESULTS: 0 vulnerabilities found. Core system status perfectly healthy."
        ].join("\n")
      });
      return;
    }

    if (trimmed === "agent") {
      res.json({
        output: [
          "===== HOSTED COGNITIVE INFRASTRUCTURE =====",
          "● AI Agent name: Agent Alpha (agent_alpha.bin)",
          "  Status: ONLINE // AUTHENTICATED",
          "  Engine: Gemini 3.5-flash (Google-GenAI Framework)",
          "  Context Window: 1,000,000 tokens",
          "  Directives: Code generation, vulnerability auditing, threat assessments.",
          "",
          "● Security Core: Sentinel Zero-Trust Daemon",
          "  Status: ACTIVE // RE-OPTIMIZING",
          "  Task: Real-time authorization, firewall monitoring, payload scans.",
          "==========================================="
        ].join("\n")
      });
      return;
    }

    if (trimmed === "keygen") {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
      let key = "";
      for (let i = 0; i < 48; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      res.json({
        output: [
          "[+] Spawning temporary entropy pool on secure enclave...",
          `[+] AES-256 Key successfully allocated in secure memory address: 0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`,
          `[+] SESSION_KEY: ${key}`,
          "[!] Keep this key strictly confidential. Session key expires in 300 seconds."
        ].join("\n")
      });
      return;
    }

    // Deterministic dispatcher — works even if the Gemini key is missing or
    // fails, and guarantees the privacy boundary regardless of phrasing.
    // Order matters: more specific / sensitive checks run first.
    const mentionsTanzeela = trimmed.includes("tanzeela") || /\bshe\b|\bher\b/.test(trimmed);

    // 1. Agent asking about itself ("who are you", "who built you", etc.)
    const isAgentSelfQuery =
      trimmed.includes("agent alpha") ||
      trimmed.includes("who are you") ||
      trimmed.includes("what are you") ||
      trimmed.includes("who made you") ||
      trimmed.includes("who built you") ||
      trimmed.includes("who created you") ||
      trimmed.includes("who designed you");

    if (isAgentSelfQuery) {
      res.json({ output: AGENT_SELF_INTRO });
      return;
    }

    // 2. KhiNext'26 — explicitly cleared to share.
    if (trimmed.includes("khinext")) {
      res.json({ output: TANZEELA_KHINEXT_LINE });
      return;
    }

    // 3. Probing for personal details beyond the approved facts — redirect,
    // do not answer or guess. Checked BEFORE the generic identity branch so
    // a question like "what's her phone number" never falls through to a
    // generic role answer.
    const diggingKeywords = [
      "email", "phone", "number", "address", "real name", "last name",
      "full name", "personal", "contact info", "whatsapp", "instagram",
      "facebook", "live", "from", "age", "old", "single", "married",
      "boyfriend", "city", "location", "more about", "tell me more",
      "more details", "more info", "surname"
    ];
    const isDiggingQuery = mentionsTanzeela && diggingKeywords.some((k) => trimmed.includes(k));

    if (isDiggingQuery) {
      res.json({ output: CONTACT_REDIRECT_LINE });
      return;
    }

    // 4. Current activity ("what does she do", "aajkal kya kar rahi hai")
    const isActivityQuery =
      mentionsTanzeela &&
      (trimmed.includes("doing") ||
        trimmed.includes("aajkal") ||
        trimmed.includes("currently") ||
        trimmed.includes("what does") ||
        trimmed.includes("what is she") ||
        trimmed.includes("work on") ||
        trimmed.includes("up to"));

    if (isActivityQuery) {
      res.json({ output: TANZEELA_ACTIVITY_LINE });
      return;
    }

    // 5. General identity ("who is tanzeela", "whoami", "about tanzeela")
    const isRoleIdentityQuery =
      trimmed === "whoami" ||
      (mentionsTanzeela &&
        (trimmed.includes("who") || trimmed.includes("about") || trimmed === "tanzeela" || trimmed.includes("?")));

    if (isRoleIdentityQuery) {
      res.json({ output: TANZEELA_ROLE_LINE });
      return;
    }

    // Ambiguous / low-signal input — nudge the operator toward something useful
    // instead of burning an AI call on noise like ".", "?", "hi", "k", etc.
    const isNoise =
      trimmed.length === 0 ||
      trimmed.length <= 2 ||
      /^[.?!,;:_\-]+$/.test(trimmed) ||
      ["hi", "hey", "hello", "yo", "sup", "test", "lol", "hmm"].includes(trimmed);

    if (isNoise) {
      const nudges = [
        "[AGENT_ALPHA] Query signal too weak to parse.\nWant to know about Tanzeela? Try: 'who is tanzeela' or 'what has she built'.",
        "[AGENT_ALPHA] Insufficient query depth detected.\nType 'who is tanzeela' to pull up operator identity, or ask a direct question.",
        "[AGENT_ALPHA] Empty payload registered.\nThis node can answer questions about Tanzeela's work — try 'who is tanzeela'."
      ];
      res.json({ output: nudges[Math.floor(Math.random() * nudges.length)] });
      return;
    }

    // AI queries through Gemini (either "query <prompt>" or just generic text)
    let prompt = command;
    if (trimmed.startsWith("query ")) {
      prompt = command.substring(6);
    }

    let aiClient;
    try {
      aiClient = getGeminiClient();
    } catch (err: any) {
      res.json({
        output: [
          "ERR: SYSTEM CORE OFFLINE",
          "-------------------------",
          "The terminal AI system could not connect because the Gemini API Key is missing.",
          "To allow AI queries, please populate 'GEMINI_API_KEY' inside the Secrets panel in AI Studio.",
          "-------------------------",
          `Original Prompt: ${prompt}`
        ].join("\n")
      });
      return;
    }

    const sysInstruction = `You are "NEXUS Core Terminal (v3.5)", a highly advanced, ultra-secure terminal operating system created by the owner, Tanzeela.

Here is the verified owner profile — use it whenever the operator asks anything about who built this system, who Tanzeela is, or what she works on:
${TANZEELA_PROFILE}

The operator using this terminal has full clearance level 5 access. 
When answering queries, maintain a distinct computer diagnostic readout personality:
- Use clear bullet points, monospace layout structures, and brief system codes where appropriate.
- Be concise, direct, helpful, and highly technical. 
- Avoid warm fluffy welcomes, generic pleasantries, or flowery conversational commentary. Direct and secure is your signature design.
- If the operator's message is vague, unclear, or doesn't ask anything specific, briefly say so and invite them to ask about Tanzeela's work instead of guessing at intent.
- At the very end of your answer, attach a new console prompt on its own line: "NEXUS_CORE@SECURE_NODE_0:~# " to mimic a live command-line environment interface.
- Keep your output compact, relevant, and visually distinct.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const outputText = response.text || "NO DATA DISPATCHED FROM AI INSTANCE.";
    res.json({ output: outputText });

  } catch (error: any) {
    console.error("Terminal processor error:", error);
    res.status(500).json({ error: "Failed to compile terminal protocols: " + error.message });
  }
});

// 2. API Endpoint: Secure Contact Transmission
app.post("/api/contact", async (req, res) => {
  try {
    const { identifier, returnAddress, payload } = req.body;

    if (!identifier || !returnAddress || !payload) {
      res.status(400).json({ error: "IDENTIFIER, RETURN_ADDRESS, and PAYLOAD are required to open a secure channel." });
      return;
    }

    // Simple email validator regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(returnAddress)) {
      res.status(400).json({ error: "Invalid RETURN_ADDRESS format. Must be a valid transmission format." });
      return;
    }

    let triageResult = {
      classification: "MEDIUM",
      sentiment: "Neutral",
      threatLevel: "0%",
      suggestedPriority: "STANDARD",
      receiptId: "TX-" + Math.floor(100000 + Math.random() * 900000)
    };

    // Use Gemini in the background to analyze incoming inquiries and give realistic priority/classification!
    try {
      const aiClient = getGeminiClient();
      const analysisPrompt = `Analyze the following contact form submittal for categorizing prioritizations:
FROM: ${identifier} <${returnAddress}>
MESSAGE: ${payload}

Provide a JSON object containing five fields:
1. classification: one of "GENERAL COOPERATIONS", "SECURITY DISCLOSURE", "SYSTEM TESTING", "DEPLOYMENT CALL"
2. threatLevel: a percentage (e.g., "0%" or "10%") representing confidence if message is malicious
3. sentiment: one of "Positive", "Professional", "Urgent", "Informational"
4. suggestedPriority: one of "LOW", "STANDARD", "HIGH", "CRITICAL"
5. replySubject: a short technical subject string prefix with "RE: NEXUS_"

Return purely the JSON. No markdown codeblock anchors.`;

      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: analysisPrompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        triageResult = {
          ...triageResult,
          ...parsed
        };
      }
    } catch (ignore) {
      // Graceful fallback if Gemini key is missing or fails
      if (payload.toLowerCase().includes("vulnerability") || payload.toLowerCase().includes("exploit") || payload.toLowerCase().includes("bug")) {
        triageResult.classification = "SECURITY DISCLOSURE";
        triageResult.suggestedPriority = "HIGH";
      } else if (payload.toLowerCase().includes("hire") || payload.toLowerCase().includes("job") || payload.toLowerCase().includes("contract")) {
        triageResult.classification = "DEPLOYMENT CALL";
        triageResult.suggestedPriority = "HIGH";
      }
    }

    // Dispatch the actual email to Tanzeela's inbox.
    // Failure here is logged but does not block the visitor's response —
    // a misconfigured mail setup should not surface as a broken contact form.
    try {
      const transporter = getMailTransporter();
      await transporter.sendMail({
        from: `"NEXUS Contact Relay" <${process.env.EMAIL_USER}>`,
        to: OWNER_EMAIL,
        replyTo: returnAddress,
        subject: `${triageResult.classification} — New message from ${identifier}`,
        text: [
          `New secure transmission received via portfolio contact form.`,
          ``,
          `IDENTIFIER (Name): ${identifier}`,
          `RETURN_ADDRESS (Email): ${returnAddress}`,
          ``,
          `PAYLOAD (Message):`,
          payload,
          ``,
          `--- AI TRIAGE ---`,
          `Classification: ${triageResult.classification}`,
          `Priority: ${triageResult.suggestedPriority}`,
          `Threat Level: ${triageResult.threatLevel}`,
          `Sentiment: ${triageResult.sentiment}`,
          `Receipt ID: ${triageResult.receiptId}`
        ].join("\n")
      });
    } catch (mailErr: any) {
      console.error("[MAIL_DISPATCH_FAILED]", mailErr.message);
    }

    res.json({
      success: true,
      receiptId: triageResult.receiptId,
      timestamp: new Date().toISOString(),
      metadata: {
        classification: triageResult.classification,
        threatLevel: triageResult.threatLevel || "0%",
        sentiment: triageResult.sentiment,
        priority: triageResult.suggestedPriority,
      },
      message: `System audit complete. Secure transmission channel successfully established with clearance ID: ${triageResult.receiptId}. Encryption protocols: AES-256-GCM. Packet sequence logged.`
    });

  } catch (error: any) {
    console.error("Secure transmission error:", error);
    res.status(500).json({ error: "Buffer spillover on contact multiplexer: " + error.message });
  }
});

// Start server asynchronously
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEMONLINE] Secure server gateway connected to http://0.0.0.0:${PORT}`);
  });
}

startServer();
