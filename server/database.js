import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('foods.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
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
    db.run(
        `CREATE TABLE IF NOT EXISTS active_foods (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            foods TEXT DEFAULT ''
        )`
    );
    db.run(`
      INSERT INTO active_foods (id, foods)
      SELECT 1, '' WHERE NOT EXISTS (SELECT 1 FROM active_foods WHERE id = 1)
    `);
  
    db.run(
        `CREATE TABLE IF NOT EXISTS foods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            calories INTEGER NOT NULL,
            protein INTEGER NOT NULL,
            carbs INTEGER NOT NULL,
            fat INTEGER NOT NULL
        )`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS meals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            foods TEXT
        )`
    );
});

export async function setActiveFoods(ids) {
  return new Promise(async (resolve, reject) => {
    db.run('UPDATE active_foods SET foods = ? WHERE id = 1', ids.join(','), async (err) => {
      if (err) reject(err);
      else resolve(await getActiveFoods());
    });
  });     
}

export async function getActiveFoods() {
  return new Promise(async (resolve, reject) => {
    db.get('SELECT * FROM active_foods WHERE id = 1', async (err, row) => {
      if (err) reject(err);
      else resolve((row?.foods[0]?.length > 0) ? row.foods.split(',') : []);
    });
  });     
}

export async function addFoodToDB(food) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO foods (name, calories, protein, carbs, fat) VALUES (?,?,?,?,?)',
      food,
      async (err) => {
        if (err) reject(err);
        else resolve(await getAllFoods());
      }
    );
  });
}

export function getAllFoods() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM foods', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function deleteFoodById(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM foods WHERE id = ?', id, async (err) => {
        if (err) reject(err);
        else resolve(await getAllFoods());
      });
    });
  }

export function checkFood(food) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id FROM foods WHERE name = ?', food, (err, id) => {
      if (!id) reject(food);
      else resolve(id);
    });
  });
}

export async function addMealToDB({name, foods}) {
  return new Promise(async (resolve, reject) => {
    db.run('INSERT INTO meals (name, foods) VALUES (?, ?)', [name, foods.join(',')], async (err) => {
      if (err) reject(err);
      else resolve(await getAllMeals());
    });
  });
}

export async function updateMeal(meal, foods) {
  return new Promise(async (resolve, reject) => {
    const foodIds = await Promise.allSettled(foods.map((f) => checkFood(f)));
    const notIn = foodIds.filter((f) => f.status === 'rejected').map((f) => f.reason);
    if (notIn.length > 0) return reject(notIn.join(',') + ' not added.');
    const isIn = foodIds.map((f) => f.value.id);
    const foodsStr = isIn.join(',');
    db.run('UPDATE meals SET foods = ? WHERE name = ?', [foodsStr, meal], (err) => {
      if (err) reject(err);
      else resolve('Updated ' + meal);
    });
  });
}

export function getAllMeals() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM meals`, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
