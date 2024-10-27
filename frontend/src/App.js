import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timer from './components/timer';
import Navbar from './components/navbar';
import Information from './components/information'; 
import Login from './components/login';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Navbar/>
          <Timer/>
        </main>

        <Information/>

        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
