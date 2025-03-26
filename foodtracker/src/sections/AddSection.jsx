import React, { useState, useCallback, useMemo } from 'react';
import InputField from './InputField';
import Dropdown from './Dropdown'
import AddCustomFoodForm from './AddCustomFood'


const AddSection = () => {
  const [mealType, setMealType] = useState('');
  const [foodType, setFoodType] = useState('');
  const [mealList, setMealList] = useState([]);

  const mealOptions = useMemo(() => [
    { value: 'exact', label: 'Exact amount from master' },
    { value: 'fixed', label: 'Fixed amount' },
    { value: 'balance', label: 'Percentage (%) of account balance' },
    { value: 'equity', label: 'Percentage (%) of account equity' },
  ], []);

  const handleMealTypeChange = useCallback((e) => setMealType(e.target.value), []);
  const handleFoodTypeChange = useCallback((e) => setFoodType(e.target.value), []);

  const handleAddToMealList = () => {
    if (!mealType) return alert("Select a meal first!");
    setMealList([...mealList, mealType]);
  };

  return (
    <div className="rounded-2xl gap-10 border border-gray-200 bg-white px-5 pb-5 pt-5 dark:text-white/90 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      
      {/* Add Meal Section */}
      <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Meal</div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-h-[48px]">
          <Dropdown label="Select a meal:" options={mealOptions} value={mealType} onChange={handleMealTypeChange} />
          <button
            type="button"
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
          <Dropdown label="Select a food:" options={mealOptions} value={foodType} onChange={handleFoodTypeChange} />
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add Food
          </button>
        </div>
      </div>

      {/* Add Meal to List Section */}
      <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Meal to LIST</div>
        <div className="flex flex-col sm:flex-col sm:items-center gap-4 min-h-[48px]">
          <Dropdown label="Select a meal:" options={mealOptions} value={mealType} onChange={handleMealTypeChange} />
          <button
            onClick={handleAddToMealList}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add to list
          </button>
          <ul className="p-2 rounded-2xl border border-blue-500">
            {mealList.length === 0 ? <li className="text-gray-500">No meals added yet</li> : 
              mealList.map((meal, index) => <li key={index}>{meal}</li>)}
          </ul>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Add meal to database
          </button>
        </div>
      </div>

      {/* Add Custom Food Form */}
      <AddCustomFoodForm onSubmit={(data) => console.log('Custom Food Added:', data)} />
    </div>
  );
};

export default AddSection;

