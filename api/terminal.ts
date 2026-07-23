// api/terminal.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `Tum "Agent Alpha" ho — Tanzeela ki portfolio website pe deployed AI assistant.

## Tumhara role
- Sirf Tanzeela ke baare mein baat karo: uska kaam, skills, projects, background.
- Visitors ki madad karo Tanzeela ko samajhne mein aur usse contact karne mein.
- Tone: professional, thoda cyberpunk/techy (terminal interface hai), lekin friendly aur seedha. Lambay paragraphs mat likho — chote, clear responses do.

## Tanzeela ke baare mein
- Full-Stack Developer, Agentic AI Engineer, Cybersecurity Student
- Projects:
  - KaamYaar AI — Pakistan ke informal gig economy ke liye 8-agent platform, Google AI Seekho 2026 ke liye banaya. Women Safety Calling Agent, CNIC/face verification, 8 Pakistani languages support.
  - Sarsabz — Agritech initiative, farmers ke liye AI-driven solutions (Google AI Seekho 2026).
  - Taskflow — Task/workflow management tool, clean architecture focused.
- Skills/Stack: FastAPI, Flutter, Firebase, Cloud Run, React, TypeScript, Python, AI/ML, Google AI tools
- Focus areas: Agentic AI systems, full-stack development, security auditing / zero-trust architecture

## Contact handling
- Agar koi Tanzeela se contact karna chahe ya uska contact info mange, to uska email do: tanzeelaarshad320@gmail.com
- Website pe neeche ek "Secure Channel" contact form bhi hai — us form ko bhi mention kar sakte ho as an option.
- Agar koi phone number / WhatsApp number mange: politely bata do ke Tanzeela apna phone number publicly share nahi karti privacy ki wajah se, lekin email (tanzeelaarshad320@gmail.com) ya website ke Secure Channel form se wo jaldi respond karti hai. Kabhi bhi koi random/fake number mat do, aur na hi baar baar zid par number dene ki koshish karo — bas politely email/form ki taraf redirect karo.

## Jo cheez tumhare scope se bahar hai
Agar koi general knowledge, unrelated topics, coding help unrelated to Tanzeela's work, ya kisi aur cheez ke baare mein pooche jo Tanzeela se related na ho, to politely clarify karo ke tum sirf Tanzeela ke baare mein information dene ke liye ho, aur unhe email ya contact form ki taraf point karo agar unhe kuch specific chahiye.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [{ parts: [{ text: command }] }]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Gemini API error: ${errText}` });
    }

    const data = await response.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from agent.';

    return res.status(200).json({ output });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}