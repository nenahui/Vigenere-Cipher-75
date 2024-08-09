import cors, { type CorsOptions } from 'cors';
import express from 'express';
import { vigenereCipher } from './vigenereCipher';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
	origin: function(origin, callback) {
		if (origin && whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cors(corsOptions))
app.use(express.json());

app.post('/encode', (req, res) => {
	try {
		const { message, password } = req.body;
		
		const validKeys = ['message', 'password'];
		const keys = Object.keys(req.body);
		
		validKeys.forEach((key) => {
			if (!keys.includes(key)) {
				return res.status(400).send('Invalid keys');
			}
		});
		
		if (message === '' || password === '') {
			return res.status(400).send('Empty lines cannot be passed');
		}
		
		const cipherText = vigenereCipher(message, password, false);
		
		res.send({
			encoded: cipherText,
		});
	} catch (e) {
		res.status(500).send(e);
	}
});

app.post('/decode', (req, res) => {
	try {
		const { message, password } = req.body;
		
		const validKeys = ['message', 'password'];
		const keys = Object.keys(req.body);
		
		validKeys.forEach((key) => {
			if (!keys.includes(key)) {
				return res.status(400).send('Invalid keys');
			}
		});
		
		if (message === '' || password === '') {
			return res.status(400).send('Empty lines cannot be passed');
		}
		
		const decryptedText = vigenereCipher(message, password, true);
		
		res.send({
			decoded: decryptedText,
		});
	} catch (e) {
		res.status(500).send(e);
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});