import React, { useState, useEffect } from 'react';
import req from '../requests'

const GetFoodsById = (foodIds, allFoods, DeleteFood) => {
  const foods = foodIds.map(id => 
                  allFoods.find(f=>f.id == id) || 
                  {name: "Can't find"});
  return (
    <tbody>
    {foods && foods.length > 0 && foods.map((food, index) => (
      <tr key={index} className="border-b">
        <td 
          className="p-2 text-center"
          style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
        >
          {food.name}
        </td>
        <td className="p-2 text-center">{food.calories}</td>
        <td className="p-2 text-center">{food.protein}</td>
        <td className="p-2 text-center">{food.carbs}</td>
        <td className="p-2 text-center">{food.fat}</td>
  <td className="p-2 text-center">
  <button
    onClick={() => DeleteFood(food.id.toString())}
    type="button"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
  >
    Delete
  </button>
  </td>
      </tr>
    ))}
    </tbody>
  )
}

const CurrentFoods = ({ setActiveFoods, activeFoods, allFoods }) => {
	const fields = ["Name", "Calories", "Protein", "Carb", "Fat"];

  const [totalMacros, setTotalMacros] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  const DeleteFoodFromActive = async (id) => {
    setActiveFoods(prevFoods => {
      const indexToRemove = prevFoods.indexOf(id);
      if (indexToRemove === -1) return prevFoods;
      prevFoods.splice(indexToRemove, 1)

      req.addFoodsToActive(JSON.stringify({ foods: prevFoods }))
        .then(foods => setActiveFoods(foods))
      return prevFoods
    })
  }

	useEffect(() => {
    setTotalMacros(() => {
      return activeFoods.reduce(
        (totals, foodId) => {
          const macros = allFoods.find(food => food.id == foodId)
          return {
            calories: totals.calories + (macros.calories || 0),
            protein: totals.protein + (macros.protein || 0),
            carbs: totals.carbs + (macros.carbs || 0),
            fat: totals.fat + (macros.fat || 0),
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
    })
	}, [activeFoods])

  useEffect(() => {
    req.getActiveFoods()
        .then(data => setActiveFoods(data))
  }, [])

  return (
    <div className="rounded-2xl gap-10 border border-gray-200 bg-white px-5 pb-5 pt-5 dark:text-white/90 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
	<div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
      <h2 className="text-lg font-bold">Total macros</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b">
            {fields.slice(1).map((field, index) => (
              <th key={index} className="p-2 text-center font-bold">{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalMacros.calories}</td>
            <td>{totalMacros.protein}</td>
            <td>{totalMacros.carbs}</td>
            <td>{totalMacros.fat}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
      <h2 className="text-lg font-bold">Current Foods</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b">
            {fields.map((field, index) => (
              <th key={index} className="p-2 text-center font-bold">{field}</th>
            ))}
          </tr>
        </thead>
        {GetFoodsById(activeFoods, allFoods, DeleteFoodFromActive)}
      </table>
    </div>
  
    </div>
  );
};

export default CurrentFoods;

