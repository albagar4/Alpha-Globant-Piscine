import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import pokemonLogo from './assets/pokemon-logot.png';
import './App.css';
import SetLogin from './setLogin';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <img
          style={{ width: '100%', height: '100%' }}
          src={pokemonLogo}
          className="logo pokemon"
          alt="Pokemon logo"
        />
      </div>
      <h1>Welcome to PokeAPI!</h1>
      <div className="card">
        <button onClick={() => navigate('/login')}>Login here</button>
      </div>
      <p className="read-the-docs">Project realized during the Alpha-Pilot of Globant-42</p>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SetLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

