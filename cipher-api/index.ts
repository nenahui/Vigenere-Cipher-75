import express from 'express';
import v from 'vigenere-encoder';
import { vigenereCipher } from './vigenereCipher';

const app = express();
const port = 8000;

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
		
		res.send(cipherText);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});