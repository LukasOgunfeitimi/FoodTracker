import React, { useState, useCallback, useMemo } from 'react';
import InputField from './InputField';

const AddCustomFoodForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
  
    const handleSubmit = () => {
      if (!name || !calories) return alert("Name and Calories are required!");
      const data = { name, calories, protein, carbs, fat };
      onSubmit(data);
      setName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
    };
  
    return (
      <div className="mb-4 rounded-2xl gap-10 border border-blue-200 p-2">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Add Custom Food to database
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-start">
          <div className="flex flex-col gap-6 w-full">
            <InputField label="Name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Calories" type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
            <InputField label="Protein" type="text" value={protein} onChange={(e) => setProtein(e.target.value)} />
            <InputField label="Carbs" type="text" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
            <InputField label="Fat" type="text" value={fat} onChange={(e) => setFat(e.target.value)} />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 mt-3 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Add to database
        </button>
      </div>
    );
  };

  export default AddCustomFoodForm