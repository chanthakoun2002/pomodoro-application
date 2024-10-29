import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timer from './components/timer';
import Navbar from './components/navbar';
import Information from './components/information'; 

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Navbar/>
          <Timer/>
        </main>
        <Information/>
      </div>
    </Router>
  );
}

export default App;
