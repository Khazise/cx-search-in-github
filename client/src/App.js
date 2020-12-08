import logo from './logo_git.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form action = "http://localhost:4242/users">
          <label>
            Login :
            <input type="text" name="login" />
          </label>
          <input type="submit" value="Valider" />
        </form>
        
      </header>
    </div>
  );
}

export default App;
