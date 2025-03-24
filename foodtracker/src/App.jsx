import { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="rounded-2xl gap-10 border border-gray-200 bg-white px-5 pb-5 pt-5 dark:text-white/90 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="mb-4">
            <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Meal</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-h-[48px]">
                <div className="flex p-2">Select a meal: </div>
                <select
                    className="p-2 border border-gray-300 rounded-lg w-50 sm:w-80 bg-white text-black dark:bg-gray-700 dark:text-white"
                >
                    <option value="exact">Exact amount from master</option>
                    <option value="fixed">Fixed amount</option>
                    <option value="balance">Percentage (%) of account balance</option>
                    <option value="equity">Percentage (%) of account equity</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
                >
                    Add Meal
                </button>
            </div>
        </div>

        <div className="mb-4">
            <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Food</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-h-[48px]">
                <div className="flex p-2">Select a food: </div>
                <select
                    className="p-2 border border-gray-300 rounded-lg w-50 sm:w-80 bg-white text-black dark:bg-gray-700 dark:text-white"
                >
                    <option value="exact">Exact amount from master</option>
                    <option value="fixed">Fixed amount</option>
                    <option value="balance">Percentage (%) of account balance</option>
                    <option value="equity">Percentage (%) of account equity</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
                >
                    Add Food
                </button>
            </div>
        </div>

        <div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Custom Food</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-start">
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex p-2 w-1/3 text-left">Name:</div>
                        <input
                            type="text"
                            placeholder='Name'
                            className="p-2 border border-gray-300 rounded-lg w-2/3 bg-white text-black dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex p-2 w-1/3 text-left">Calories:</div>
                        <input
                            type="number"
                            placeholder='Calories'
                            className="p-2 border border-gray-300 rounded-lg w-2/3 bg-white text-black dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex p-2 w-1/3 text-left">Protein:</div>
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg w-2/3 bg-white text-black dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex p-2 w-1/3 text-left">Carbs:</div>
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg w-2/3 bg-white text-black dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex p-2 w-1/3 text-left">Fat:</div>
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg w-2/3 bg-white text-black dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 mt-3 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
            >
                Add Food
            </button>
        </div>
    </div>
  )
}

export default App;