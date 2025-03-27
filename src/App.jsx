import { useState, useEffect } from 'react';
import './App.css';
import { AddSection } from './sections/AddSection';
import CurrentFoods from './sections/CurrentFoods'
function App() {
  const [activeFoods, setActiveFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
		<AddSection 
      setAllFoods={setAllFoods} 
      allFoods={allFoods}

      setActiveFoods={setActiveFoods}
      activeFoods={activeFoods}
      ></AddSection>
		<CurrentFoods 
      setActiveFoods={setActiveFoods} 
      activeFoods={activeFoods}

      allFoods={allFoods}
      ></CurrentFoods>
    </div>
  )
}

export default App;