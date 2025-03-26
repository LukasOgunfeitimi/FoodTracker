import React, { useState, useCallback, useMemo, useEffect } from 'react';
import req from '../requests'
const DeleteFood = async (id, setFoods) => {
	req.deleteFood(JSON.stringify({ id }))
		.then(data => setFoods(data.foods))

}
const CurrentFoods = () => {
	const fields = ["Name", "Calories", "Protein", "Carb", "Fat"];
	const [foods, setFoods] = useState([]);

	useEffect(() => {
		fetch('foods')
			.then(res => res.json())
			.then(data => setFoods(data.foods))
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
        <tbody>
          {foods.length > 0 && foods.map((food, index) => (
            <tr key={index} className="border-b">
              <td 
                className="p-2 text-center"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              >
                {food.name}
              </td>
              <td className="p-2 text-center">{food.cal}</td>
              <td className="p-2 text-center">{food.protein}</td>
              <td className="p-2 text-center">{food.carb}</td>
              <td className="p-2 text-center">{food.fat}</td>
			  <td className="p-2 text-center">
				<button
					onClick={() => DeleteFood(food.id, setFoods)}
					type="button"
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
				>
					Delete
				</button>
			  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    </div>
  );
};

export default CurrentFoods;

