import logo from './etf-logo.png'; // Nova slika loga
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
      	  Ovo je diplomski rad od Belme Šehović.
        </p>
        <a
          className="App-link"
          href="https://bsehovic2.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Moj Portfolio
        </a>
      </header>
    </div>
  );
}

export default App;
