const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('foods.db', (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database');
});
const FOODS = [
    ['egg', 85, 8, 1, 5],
    ['bread', 55, 2, 9, 1],
    ['sainsburysbeefskirt', 850, 145, 0, 20],
    ['sainsburysbagel', 222, 7, 43, 2],
    ['unclebenswholegrain', 360, 15, 65, 5],
    ['chickenbreast200g', 212, 48, 0, 2],
    ['mince100g', 174, 27, 0, 7],
    ['jamhoneyTSP', 20, 0, 4, 0],
    ['bacon', 60, 5, 0, 5],
    ['mcd largefries', 444, 4, 55, 22],
    ['mcd mediumfries', 337, 3, 42, 17],
    ['mcd mayochicken', 282, 12, 36, 10],
    ['mcd big mac', 493, 26, 42, 24],
    ['mcd beef', 90, 8, 0, 7],
    ['mcd beefbreakfast', 282, 27, 2, 19],
    ['demae ramen', 91, 2, 11, 4],
    ['baton', 550, 20, 100, 1],
    ['curstyroll', 147, 5, 30, 0],
    ['greekyogurt 100g', 103, 4, 4, 8],
    ['mixedberries 100g', 30, 1, 5, 0],
    ['granola 100g', 435, 10, 65, 13],
    ['horalky bar', 271, 4, 16],
];
db.serialize(async () => {
    db.run(`CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER NOT NULL,
        protein INTEGER NOT NULL,
        carbs INTEGER NOT NULL,
        fat INTEGER NOT NULL
    )`);
  
    db.run(`CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        foods TEXT
    )`);
    
    function addFood(food) {
        return new Promise((res, rej) => {
            db.run("INSERT INTO foods (name, calories, protein, carbs, fat) VALUES (?,?,?,?,?)", food, (err) => {
                if (err) rej(err);
                else res("Added " + food[0]);
            })
        })
    }
    function getAllFoods() {
        return new Promise((res, rej) => {
            db.all("SELECT * FROM foods", (err, rows) => {
                if (err) rej(err);
                else res(rows);
            })
        });
    }
    function checkFood(food) {
        return new Promise((res, rej) => {
            db.get("SELECT id FROM foods WHERE name = ?", food, (err, id) => {
                if (!id) rej(food)
                else res(id);
            })
        })
    }
    function addMeal(meal, foods) {
        return new Promise(async (res, rej) => {
            const foodIds = await Promise.allSettled(foods.map(f => checkFood(f)))
            const notIn = foodIds.filter(f => f.status === "rejected").map(f => f.reason);
            if (notIn.length > 0) return rej(notIn.join(",") + " not added.");
            const isIn = foodIds.map(f => f.value.id);
            const foodsStr = isIn.join(",");
            db.run("INSERT INTO meals (name, foods) VALUES (?, ?)", [meal, foodsStr], (err) => {
                if (err) rej(err);
                else res("Added " + meal);
            })
        })
    }
    function updateMeal(meal, foods) {
        return new Promise(async (res, rej) => {
            const foodIds = await Promise.allSettled(foods.map(f => checkFood(f)))
            const notIn = foodIds.filter(f => f.status === "rejected").map(f => f.reason);
            if (notIn.length > 0) return rej(notIn.join(",") + " not added.");
            const isIn = foodIds.map(f => f.value.id);
            const foodsStr = isIn.join(",");
            db.run("UPDATE meals SET foods = ? WHERE name = ?", [foodsStr, meal], (err) => {
                if (!meal) rej(meal + "Meal not found.")
                else res("Updated " + meal);
            })
        })
    }
    function getAllMeals() {
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM meals`, (err, rows) => {
                if (err) rej(err);
                else res(rows);
            })
        });
    }
    /*
    updateMeal("Beef Ramen", ["egg"])
        .then(e=>console.log(e))
        .catch(e=>console.log(e))
    /*
    addMeal("Beef Ramen", ["mince100g", "mince100g"])
        .then(e=>console.log(e))
        .catch(e=>console.log(e))
        */

    //addFoodToMeal("Beef Ramen", "egg").then(e=>console.log(e))
    getAllMeals().then(e=>console.log(e))
    //getAllFoods().then(e=>console.log(e))
    /*
    const addInitialFoods = await Promise.allSettled(FOODS.map(async (f) => {
        return await addFood(f);
    }))
       */
});

  
