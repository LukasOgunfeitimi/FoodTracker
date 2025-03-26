import { useState, useEffect } from 'react';
import './App.css';
import AddSection from './sections/AddSection';
function App() {
  return (
    <div className="flex flex-col sm:flex-row">
    <AddSection></AddSection>
    </div>
  )
}

export default App;