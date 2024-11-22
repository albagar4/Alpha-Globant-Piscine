import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/generate_travel_info', async (req, res) => {
	const query = req.query.query;
	const prompt = `Do not ask me for more details than the following I'm providing you. Write it for me in a basic html that doesn't interfere with my own css, avoid the \`\`\`html and \`\`\` at the end. Suggest me a trip itinerary to a place with the following characteristics: ${query}`;
	
	const result = await model.generateContent(prompt);
	res.json(result.response.text());
});

app.get('/generate_travel_coord', async (req, res) => {
	const query = req.query.query;
	const prompt = `In the next text there is a place mentioned. I want you to search online the coordinates of the most populated zone on it (even though is a big city or country) and provide them for me in the format xx.xx, xx.xx, do not tell me anything else: ${query}`;
	
	const result = await model.generateContent(prompt);
	res.json(result.response.text());
});

app.get('/image_to_text', async (req, res) => {
	
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
  });
