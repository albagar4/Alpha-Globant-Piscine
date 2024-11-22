import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

dotenv.config();

const app = express();
const port = 5000;

const upload = multer({ dest: 'uploads/' });

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

app.post('/image_to_text', upload.single('file'), async (req, res) => {
	try {
		const filePath = req.file.path;
		const mimeType = req.file.mimetype;

		if (!['image/jpeg', 'image/png'].includes(mimeType)) {
			res.status(400).json({ error: 'Invalid file type' });
			return ;
		}

		const fileData = fs.readFileSync(filePath).toString('base64');
		const imagePart = {
			inlineData: {
				data: fileData,
				mimeType: mimeType,
			}
		}

		const prompt = `Propose me a travel itinerary based on the following image.Write it for me in a basic html that doesn't interfere with my own css, avoid the \`\`\`html and \`\`\` at the end.`;
		const result = await model.generateContent([prompt, imagePart]);

		fs.unlinkSync(filePath);

		res.json({ response: result.response.text() });
	}
	catch (err) {
		console.error("Error processing the file:", err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
  });
