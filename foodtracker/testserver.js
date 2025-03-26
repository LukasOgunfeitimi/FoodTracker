import fs from 'node:fs/promises'
import express, { raw } from 'express'
import cors from 'cors';
const app = express()

app.use(express.json());
app.use(cors())

const keys = [47, 64, 87, 65];

const encrypt = (str) =>
	Array.from(str)
		.map((char, index) => 
			String.fromCharCode(
				char.charCodeAt(0) ^ keys[index % keys.length]
		)).join('');

const decrypt = (str) => encrypt(str);

const sendMsg = (res, body) => res.send(
	{ data : encrypt(JSON.stringify(body)) }
)

const middleware = (req, res, next) => {
	req.body = JSON.parse(decrypt(req.body.data));
	next()
}

app.use(middleware)

app.get("/foods", (req, res) => {
    res.json({ foods: [
		{ name: "dwefwef", cal: 0, protein: 0, carb: 0, fat: 0, id: 0 },
		{ name: "fwefwefewg", cal: 10, protein: 2, carb: 3, fat: 1, id: 1 },
		{ name: "Beef ramen", cal: 20, protein: 4, carb: 5, fat: 2,id: 2 },
	  ]});
})

app.delete('/food', (req, res) => {
	sendMsg(res, { foods: [
		{ name: "dwefwef", cal: 0, protein: 0, carb: 0, fat: 0, id: 0 },
		{ name: "f", cal: 10, protein: 2, carb: 3, fat: 1, id: 1 },
		{ name: "Beef ramen", cal: 20, protein: 4, carb: 5, fat: 2,id: 2 },
	  ]});
})


// Start http server
app.listen(2000, () => {
  console.log(`Server started at http://localhost:2000`)
})