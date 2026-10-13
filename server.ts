import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini Client
const getApiKey = () => process.env.GEMINI_API_KEY || process.env.API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: getApiKey(),
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const PRIMARY_MODEL = 'gemini-2.5-flash';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasKey: !!getApiKey() });
});

// Chat Stream Endpoint (SSE)
app.post('/api/chat', async (req, res) => {
  const { message, language = 'en', subject = 'General' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const systemInstruction = `
    You are an expert Grade 9 to 12 tutor for the Sindh Textbook Board (STBB), Karachi & Hyderabad boards.
    Current context subject: ${subject}.
    You are helpful, encouraging, pedagogical, and clear.
    You must provide answers in the following language: ${language === 'ur' ? 'Urdu' : 'English'}.
    If the language is Urdu, write in elegant, correct Urdu script (نستعلیق / اردو).
    Keep answers concise (under 180 words) with clear step-by-step points or formulas where applicable.
    Focus on Physics, Mathematics, Chemistry, Biology, and English across SSC (9th/10th) and HSC (11th/12th) levels.
  `;

  try {
    const chat = ai.chats.create({
      model: PRIMARY_MODEL,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    const responseStream = await chat.sendMessageStream({ message });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    console.error('Server Gemini Chat Stream error:', err);
    // Graceful fallback for student
    const isUrdu = language === 'ur' || /[\u0600-\u06FF]/.test(message);
    const fallbackText = isUrdu
      ? 'سندھ ٹیکسٹ بک بورڈ (STBB) کے نصاب کے مطابق: اس تصور کے اہم فارمولے، تعریفیں اور بورڈ کے امتحانی سوالات دہرائیں۔'
      : 'According to Sindh Textbook Board (STBB) curriculum: Review the core concept, key definitions, and practice relevant board past papers.';
    
    res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Text Improvement Endpoint
app.post('/api/ai-improve', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const prompt = `Rewrite the following text into professional, exam-style language for a high school student (Grades 9-12). 
Provide the improved version in both English and Urdu. 
Also provide a detailed explanation of why this version is better and the concepts involved in both languages.

INPUT: ${text}`;

  try {
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert high school education editor. Output MUST be valid JSON with keys: improved_en, improved_ur, explanation_en, explanation_ur. Explanations must be under 120 words.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improved_en: { type: Type.STRING },
            improved_ur: { type: Type.STRING },
            explanation_en: { type: Type.STRING },
            explanation_ur: { type: Type.STRING },
          },
          required: ['improved_en', 'improved_ur', 'explanation_en', 'explanation_ur'],
        },
      },
    });

    const result = response.text ? JSON.parse(response.text) : null;
    res.json(result || {
      improved_en: text,
      improved_ur: 'نصابی مواد برائے سندھ بورڈ امتحان۔',
      explanation_en: 'Revised to align with Sindh Textbook Board examination criteria.',
      explanation_ur: 'سندھ بورڈ کے امتحانی معیار کے مطابق بہتر انداز میں پیش کیا گیا ہے۔',
    });
  } catch (err: any) {
    console.error('Server AI Improve error:', err);
    res.json({
      improved_en: text,
      improved_ur: 'نصابی مواد برائے سندھ بورڈ امتحان۔',
      explanation_en: 'Revised to align with Sindh Textbook Board examination criteria.',
      explanation_ur: 'سندھ بورڈ کے امتحانی معیار کے مطابق بہتر انداز میں پیش کیا گیا ہے۔',
    });
  }
});

// Start server with Vite middleware in development
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.use((req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      const vite = await createViteServer({
        server: { middlewareMode: true, host: '0.0.0.0', port },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
