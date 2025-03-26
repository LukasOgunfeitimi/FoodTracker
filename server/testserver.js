import express, { raw } from 'express'
import cors from 'cors';
import { 
  deleteFoodById, 
  getAllFoods, 
  addFoodToDB, 
  getActiveFoods, 
  setActiveFoods, 
  addMealToDB,
  getAllMeals } from './database.js'

const app = express()

app.use(express.json());
app.use(cors())

const keys = [0];

const encrypt = (str) =>
	Array.from(str)
		.map((char, index) => 
			String.fromCharCode(
				char.charCodeAt(0) ^ keys[index % keys.length]
		)).join('');

const decrypt = (str) => encrypt(str)

const sendMsg = (res, body) => {
    res.send({ data : encrypt(JSON.stringify(body)) })}

const middleware = (req, res, next) => {
  if (req.method !== "GET")
    req.body = JSON.parse(decrypt(req.body.data));
	next()
}

app.use(middleware)

app.get("/getAllFoods", async (req, res) => {
    sendMsg(res, await getAllFoods());
})

app.get("/getActiveFoods", async (req, res) => {
  sendMsg(res, await getActiveFoods());
})

app.get("/getAllMeals", async (req, res) => {
  sendMsg(res, await getAllMeals());
})

app.post("/setActiveFoods", async(req, res) => {
  sendMsg(res, await setActiveFoods(req.body.foods))
})

app.post("/addFoodToDB", async(req, res) => {
    sendMsg(res, await addFoodToDB(req.body.food))
})

app.post("/addMealToDB", async(req, res) => {
  sendMsg(res, await addMealToDB(req.body))
})


app.delete('/food', async (req, res) => {
	sendMsg(res, await deleteFoodById(req.body.id));
})

app.get('*', function(req, res){
    res.status(404).send('F');
});
// Start http server
app.listen(2000, () => {
  console.log(`Server started at http://localhost:2000`)
})