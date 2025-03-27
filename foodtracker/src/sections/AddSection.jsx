import React, { useState, useCallback, useEffect } from 'react';
import Dropdown from '../elements/Dropdown'
import AddCustomFoodForm from '../elements/AddCustomFood'
import req from '../requests'
import InputField from '../elements/InputField'

const AddSection = ({ setAllFoods, allFoods, setActiveFoods, activeFoods }) => {
  const [foodsToAdd, setFoodsToAdd] = useState([]); // could be 1 or more if its meal

  const [allMeals, setAllMeals] = useState([]);

  const [newMealName, setNewMealName] = useState('');
  const [newMeal, setNewMeal] = useState([])
  const [foodToMeal, setFoodToMeal] = useState('');

  useEffect(() => {
    req.getAllFoods()
      .then(data => {
        data && data.length > 0 && 
          setFoodsToAdd([String(data[0].id)]),
          setFoodToMeal(String(data[0].id)),
          setAllFoods(data)
      }) 
    req.getAllMeals()
      .then(data => {
        data && data.length > 0 && 
          setAllMeals(data)
    }) 
  }, [])

  
  const handleMealTypeChange = (e) => {
    const mealToAdd = parseInt(e.target.value);
    if (!mealToAdd) return alert("Select a meal first");
  
    const meal = allMeals.find(meal => meal.id == mealToAdd);
    if (!meal) return alert("Meal not found");
  
    setFoodsToAdd(meal.foods.split(','));
  };
  const handleFoodTypeChange = useCallback((e) => setFoodsToAdd([e.target.value]), []);
  const handleFoodToMealChange = useCallback((e) => setFoodToMeal(e.target.value), []);


  const AddFoodToActive = () => {
    if (!foodsToAdd.length) return alert("Select a food first");

    setActiveFoods((prevActiveFoods) => {
      const updatedFoods = [...prevActiveFoods, ...foodsToAdd];

      req.addFoodsToActive(JSON.stringify({ foods: updatedFoods }))
        .then(data => {
          setActiveFoods(data);
        });

      return updatedFoods;
    });
  };

  const AddFoodtoDatabase = (food) => {
    req.addFoodToDatabase(JSON.stringify({ food }))
        .then(data => {
          setFoodsToAdd([String(data[0].id)])
          setFoodToMeal(String(data[0].id))
          setAllFoods(data)
        })
  }

  const AddFoodToMeal = () => {
    const { id, name } = allFoods.find(food => food.id == foodToMeal)
    if (!id && !name) return alert("not found");
    setNewMeal((meal) => [...meal, {id, name}])
  }

  const AddMealToDatabase = () => {
    if (newMeal.length === 0 || !newMealName) return alert("add meal")
    req.addMealToDatabase(JSON.stringify({ name: newMealName,foods: newMeal.map(meal => meal.id)}))
      .then(data => setAllMeals(data))
  }
  

  return (
    <div className="rounded-2xl gap-10 border border-gray-200 bg-white px-5 pb-5 pt-5 dark:text-white/90 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      
      {/* Add Meal Section */}
      <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Meal</div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-h-[48px]">
          <Dropdown label="Select a meal:" options={allMeals} onChange={handleMealTypeChange} />
          <button
            type="button"
            onClick={() => AddFoodToActive()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add Meal
          </button>
        </div>
      </div>

      {/* Add Food Section */}
      <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Food</div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-h-[48px]">
          <Dropdown label="Select a food:" options={allFoods} onChange={handleFoodTypeChange} />
          <button
            onClick={() => AddFoodToActive()}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add Food
          </button>
        </div>
      </div>

      {/* Add Meal to database */}
      <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Meal to database</div>
        <div className="flex flex-col sm:flex-col sm:items-center gap-4 min-h-[48px]">
          <InputField label="Meal name:" type="text" placeholder="Meal name" onChange={(e) => setNewMealName(e.target.value)} />
          <Dropdown label="Select a food:" options={allFoods} onChange={handleFoodToMealChange} />
          <button
            onClick={() => AddFoodToMeal()}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add to list
          </button>
          <ul className="p-2 rounded-2xl border border-blue-500">
            {newMeal.length === 0 ? <li className="text-gray-500">No meals added yet</li> : 
              newMeal.map(({name}, index) => <li key={index}>{name}</li>)}
          </ul>
          <button
            onClick={() => {AddMealToDatabase()}}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add meal to database
          </button>
        </div>
      </div>

      {/* Add Custom Food Form */}
      <AddCustomFoodForm onSubmit={(data) => AddFoodtoDatabase(data)} />
    </div>
  );
};

export { AddSection };

