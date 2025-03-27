import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('foods.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});


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
