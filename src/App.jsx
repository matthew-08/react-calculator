import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import CalculatorMain from './CalculatorMain';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CalculatorMain />
    </div>
  );
}

export default App;
