import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.');
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// Health check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI analysis route using gemini-3.5-flash with a structured JSON schema
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { name, sex, pclass, age, fare, cabin, sibsp, parch } = req.body;

    if (!sex || !pclass) {
      res.status(400).json({ error: 'Missing required passenger fields: sex and pclass' });
      return;
    }

    const ai = getAI();

    const passengerDesc = `
Passenger Profile:
- Name: ${name || 'Unnamed Passenger'}
- Gender: ${sex}
- Ticket Class: Class ${pclass} (${pclass === 1 ? 'First Class (Upper Deck)' : pclass === 2 ? 'Second Class (Middle Deck)' : 'Third Class (Lower Deck)'})
- Age: ${age !== undefined && age !== null ? `${age} years old` : 'Unknown (Average Age)'}
- Fare Paid: £${fare !== undefined && fare !== null ? fare.toFixed(2) : 'Unknown'}
- Cabin: ${cabin || 'None/Unknown'}
- Companions: ${parseInt(sibsp || 0, 10) + parseInt(parch || 0, 10)} (Siblings/Spouses: ${sibsp || 0}, Parents/Children: ${parch || 0})
`;

    const systemPrompt = `You are a world-class maritime historian and data scientist specializing in the Titanic sinking on April 15, 1912.
Analyze the survival likelihood of the passenger profile provided. Combine strict historical statistical patterns with immersive historical storytelling.
Use historical facts:
- "Women and children first" was strictly enforced, particularly on the port side by Officer Lightoller.
- First-class passengers had direct access to the boat deck; third-class cabins were deep in the ship with locked barriers, making evacuation extremely difficult.
- Crew members prioritized passengers with cabin numbers closer to the lifeboats (primarily decks A, B, C, D, E).
- Surviving families was rare for third-class large families.
- Port vs Starboard loading: Murdoch (starboard) loaded men if no women were waiting, while Lightoller (port) only loaded women and children.

You must reply with structured JSON fitting the specified schema.`;

    const prompt = `Perform historical survival analysis and generate a short immersive story for:
${passengerDesc}`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        survivalLikelihood: {
          type: Type.STRING,
          description: "Must be exactly 'High', 'Medium', or 'Low' based on historical data.",
        },
        survivalPercentage: {
          type: Type.INTEGER,
          description: "An estimated percentage chance of survival (0 to 100) calibrated against actual Titanic survival ratios for this demographic.",
        },
        historicalReasoning: {
          type: Type.STRING,
          description: "A detailed analysis (3-4 sentences) explaining why this demographic had this survival chance, mentioning specific lifeboat protocols, class access, or location elements.",
        },
        fictionalNarrative: {
          type: Type.STRING,
          description: "An evocative, respectful, 3-4 sentence historical fiction narrative describing what this passenger's experience would have been on the night of April 14-15, 1912, from collision to final outcome.",
        },
        actionableTips: {
          type: Type.STRING,
          description: "An educational tip outlining what specific choices or strategies could have improved their survival chances historically (e.g., going to starboard deck earlier, navigating specific corridors).",
        },
      },
      required: ["survivalLikelihood", "survivalPercentage", "historicalReasoning", "fictionalNarrative", "actionableTips"],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini AI');
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while calling the AI model. Check if your GEMINI_API_KEY is configured in Settings > Secrets.',
    });
  }
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] running on http://localhost:${PORT}`);
  });
}

startServer();
