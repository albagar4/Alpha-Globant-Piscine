import pokemonLogo from './assets/pokemon-logot.png'
import setLogin from './setLogin.tsx'
import './App.css'

function App() {
  return (
    <>
      <div>
          <img style={{ width: '100%', height: '100%' }} src={pokemonLogo} className="logo pokemon" alt="Pokemon logo" />
      </div>
      <h1>Welcome to PokeAPI!</h1>
      <div className="card">
        <button onClick={() => setLogin()}>
          Login here
        </button>
      </div>
      <p className="read-the-docs">
        Project realized during the Alpha-Pilot of Globant-42
      </p>
    </>
  )
}

export default App
