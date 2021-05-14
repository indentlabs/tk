import "@blueprintjs/core/lib/css/blueprint.css";
import './Theme.css';
import './App.css';
import './Navbar.css';

import { Button } from "@blueprintjs/core";

function App() {
  return (
    <div className="App">
      <ul className="Navbar">
        <li className="brand-name">TK</li>
        <li className="active">
          <a href='#'>
            Online
            <span className="blink green-text">&#9679;</span>
          </a>
        </li>
        <li><a href='#'>Code</a></li>
        <li><a href='#'>Retort</a></li>
        <li><a href='#'>Dactyl</a></li>
        <li>Hosts</li>
        <li>Software</li>
        <li>Mods</li>
        <li>Info</li>
        <li>Data</li>
      </ul>

      TK
      <Button intent="success" text="button content" onClick={() => { console.log('wat')}} />
    </div>
  );
}

export default App;
