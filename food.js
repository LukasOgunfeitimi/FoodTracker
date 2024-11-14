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
    ['horalky bar', 271, 4, 26, 16],

];
const MEALS = {
    "Beef Ramen": [FOODS[6], FOODS[6], FOODS[15]],
    "Pre-workout": [FOODS[18], FOODS[19], FOODS[20]],
    "McDonalds 2.99": [FOODS[12], FOODS[10]],
}
const CURRENT_FOODS = JSON.parse(localStorage.getItem("food")) || [];
const TOTAL = [0, 0, 0, 0, 0];

const el = {}
document.querySelectorAll('[id]').forEach(element => el[element.id] = element);

for (const food of FOODS) {
    const newFood = document.createElement("option");
    newFood.value = food[0];
    newFood.textContent = food[0];
    el.food.add(newFood);
}

for (const meal in MEALS) {
    const m = MEALS[meal];
    const newMeal = document.createElement("option");
    newMeal.value = meal;
    newMeal.textContent = meal;
    el.meal.add(newMeal);
}

for (const food of CURRENT_FOODS) {
    addFood(food, false);
}

function updateCaloriesAnimation() {
    const totalCalories = TOTAL[1];
    el.calories.style.setProperty('--percent', totalCalories);
}

el.addFoodBtn.addEventListener('click', () => addFood(undefined, true));
el.addMealBtn.addEventListener('click', () => {
    const meal = el.meal.value;
    const selectedMeal = MEALS[meal];
    if (!selectedMeal) return alert("Meal not found");

    for (const food of selectedMeal) addFood(food, true);
})
/*
el.clearAll.addEventListener('click', () => {
    document.querySelectorAll('.delete-btn').forEach((btn, index)=> {
        setTimeout(()=>{btn.click()}, index * 100);
    })
})*/
el.addCustomFoodBtn.addEventListener('click', () => {
    const name = el.customFood.value.trim();
    const cal = parseInt(el.customCalories.value, 10);
    const pro = parseInt(el.customProtein.value, 10);
    const carb = parseInt(el.customCarbs.value, 10);
    const fat = parseInt(el.customFat.value, 10);

    if (!name || isNaN(cal) || isNaN(pro) || isNaN(carb) || isNaN(fat)) {
        return alert("Please fill in all fields for the custom food.");
    }

    const customFood = [name, cal, pro, carb, fat];
    addFood(customFood, true);

    el.customFood.value = '';
    el.customCalories.value = '';
    el.customProtein.value = '';
    el.customCarbs.value = '';
    el.customFat.value = '';
});

function addFood(data, newFood) {
    const foodName = el.food.value;
    const selectedFood = data || FOODS.find(f => f[0] === foodName);
    if (!selectedFood) return alert("Food not found");

    const [name, cal, pro, carb, fat] = selectedFood;
    for (let i = 1; i <= 4; i++) TOTAL[i] += selectedFood[i];
    //el.calories.textContent = "Total: " + TOTAL.slice(1).join(", ");
    updateCaloriesAnimation();
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${cal}</td>
        <td>${pro}</td>
        <td>${carb}</td>
        <td>${fat}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    el.foodTableBody.appendChild(newRow);

    newRow.querySelector('.delete-btn').addEventListener('click', () => {
        for (let i = 1; i <= 4; i++) TOTAL[i] -= selectedFood[i];
        //el.calories.textContent = "Total: " + TOTAL.slice(1).join(", ");
        updateCaloriesAnimation();
        newRow.remove();
        CURRENT_FOODS.splice(CURRENT_FOODS.indexOf(selectedFood), 1);
        localStorage.setItem("food", JSON.stringify(CURRENT_FOODS));
    });

    if (!newFood) return;

    CURRENT_FOODS.push(selectedFood);
    localStorage.setItem("food", JSON.stringify(CURRENT_FOODS));
}
