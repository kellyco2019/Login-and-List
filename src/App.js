import { BrowserRouter as Router , Route , Switch , Link } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './pages/Login'
import PokePage from './pages/PokePage';
import PokeList from './pages/PokeList';

function App() {
  function logout() {
    localStorage.removeItem('email')
  }

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <button
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={PokeList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pokemon/:name" component={PokePage}/>
        </Switch> 
    </Router>
  );
}

export default App;
