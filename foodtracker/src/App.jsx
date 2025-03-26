import { useState, useEffect } from 'react';
import './App.css';
import AddSection from './sections/AddSection';
import CurrentFoods from './sections/CurrentFoods'
function App() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
		<AddSection></AddSection>
		<CurrentFoods></CurrentFoods>
    </div>
  )
}

export default App;