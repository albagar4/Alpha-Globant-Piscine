import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;
const {
	UNSPLASH_API,
	SECRET_KEY,
	RED_URL
} = process.env;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get_unsplash_urls', async (req, res) => {
	const search = req.query['search'];
	if (!search) {
		return res.status(400).send('No search query provided');
	}
	else {
		const api_key = process.env.UNSPLASH_API;
		const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${api_key}`);
		const data = await response.json();
	
		let toSend = [];
	
		data.results.forEach((result) => {
			toSend.push(result.urls.small);
		});
	
		return res.send(toSend);
	}
});

// OAuth2.0
// This will store the user's access token temporarily
let userAccessToken = null;

app.get('/auth/login', (req, res) => {
	const authUrl = `https://unsplash.com/oauth/authorize?client_id=${UNSPLASH_API}&redirect_uri=${RED_URL}&response_type=code&scope=${encodeURIComponent("public")}`
	res.redirect(authUrl);
});

app.get('/auth/token/callback', async (req, res) => {
	const code = req.query.code;

	if (!code)
		return res.status(400).send('Authorization code not found');

	try {
		const tokenUrl = 'https://unsplash.com/oauth/token';
		const payload = {
			client_id: UNSPLASH_API,
			client_secret: SECRET_KEY,
			redirect_uri: RED_URL,
			code,
			grant_type: 'authorization_code',
		};

		const response = await fetch(tokenUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Eror exchanging code:', errorData);
			return res.status(500).send('Failed to exchange code for token');
		}

		const data = await response.json();
		// I store the access token in a variable
		userAccessToken = data.access_token;

		res.redirect('http://localhost:5500/Image%20Gallery/frontend/index.html');
	}
	catch (error) {
		console.error('Unexpected error:', error);
		res.status(500).send('An unexpected error occurred');
	}
});

// The endpoint to logout the user
app.get('/auth/logout', (req, res) => {
	userAccessToken = null;
	res.json({ message: 'Logged out succesfully' });
});

// The endpoint to check if the user is authenticated
app.get('/auth/status', (req, res) => {
	if (userAccessToken)
		res.json({ authenticated: true});
	else
		res.json({ authenticated: false});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
