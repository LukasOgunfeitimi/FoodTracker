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
    ['mcdlargefries', 444, 4, 55, 22],
    ['mcdmayochicken', 282, 12, 36, 10],
    ['mcdbeef', 90, 8, 0, 7],
    ['mcdbeefbreakfast', 282, 27, 2, 19],
    ['supernoodles', 380, 7, 50, 17],
    ['baton', 550, 20, 100, 1],
    ['curstyroll', 147, 5, 30, 0]
];
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

for (const food of CURRENT_FOODS) {
    addFood(food, false);
}

el.addFoodBtn.addEventListener('click', () => addFood(undefined, true));
el.clearAll.addEventListener('click', () => {
    document.querySelectorAll('.delete-btn').forEach((btn, index)=> {
        setTimeout(()=>{btn.click()}, index * 100);
    })
})
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
    el.calories.textContent = "Total: " + TOTAL.slice(1).join(", ");

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
        el.calories.textContent = "Total: " + TOTAL.slice(1).join(", ");
        newRow.remove();
        CURRENT_FOODS.splice(CURRENT_FOODS.indexOf(selectedFood), 1);
        localStorage.setItem("food", JSON.stringify(CURRENT_FOODS));
    });

    if (!newFood) return;

    CURRENT_FOODS.push(selectedFood);
    localStorage.setItem("food", JSON.stringify(CURRENT_FOODS));
}
