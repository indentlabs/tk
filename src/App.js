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

      <div className="Toolbox">
        <div className="IdentityBrowser">
          Identity Browser
        </div>
        <div className="KnowledgeBase">
          Knowledge Base
        </div>
        <div className="InferenceEngine">
          Inference Engine
        </div>
        <div className="ProcessSelector">
          Process Selector
        </div>
      </div>

      <div className="Output">
        Output
      </div>

      <div className="Visualizer">
        Visualizer
        <Button intent="success" text="button content" onClick={() => { console.log('wat')}} />
      </div>
    </div>
  );
}

export default App;
