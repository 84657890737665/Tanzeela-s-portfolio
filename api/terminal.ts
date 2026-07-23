// api/terminal.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
          contents: [{ parts: [{ text: command }] }]
        })
      }
    );

    const data = await response.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from agent.';

    return res.status(200).json({ output });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}