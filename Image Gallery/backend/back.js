import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get_unsplash_urls', async (req, res) => {
	const search = req.query['search'];
	const api_key = process.env.UNSPLASH_API;
	const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${api_key}`);
	const data = await response.json();

	let toSend = [];

	data.results.forEach((result) => {
		toSend.push(result.urls.small);
	});

	return res.send(toSend);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
