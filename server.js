import express from "express";
import path from "path";
import compression from "compression";

import { 
  deleteFoodById, 
  getAllFoods, 
  addFoodToDB, 
  getActiveFoods, 
  setActiveFoods, 
  addMealToDB,
  getAllMeals 
} from './database.js'

const keys = [0x7F, 0xE3, 0xA9, 0x1C, 0xD4, 0x56, 0x92, 0xAC, 0xF0, 0xB8, 0x4D, 0x75, 0x6A, 0x3E, 0x01, 0xFC];
const encrypt = (str) =>
  Array.from(str)
    .map((char, index) => 
      String.fromCharCode(
        char.charCodeAt(0) ^ keys[index % keys.length]
    )).join('');
const decrypt = (str) => encrypt(str)


const app = express();

app.use(compression());
app.use(express.json());

const sendMsg = (res, body) => {
  res.send({ data : encrypt(JSON.stringify(body)) })}

const middleware = (req, res, next) => {
if (req.method !== "GET")
  req.body = JSON.parse(decrypt(req.body.data));
next()
}

app.use(middleware)


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

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

app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3047, () => {
  console.log(`HTTP Server running at http://localhost:${3047}`);
});

