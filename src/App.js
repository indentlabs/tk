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
            &nbsp;
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
        <div className="IdentityBrowser bordered-section marginalized">
          <div className="section-title">
            Identity selector
          </div>
          <img src="https://i.imgur.com/Fv6NiyJ.png" className="avatar" />
          <div>
            <label for="medium">Medium:</label>

            <select name="medium" id="medium">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div>
            <label for="channel">Channel:</label>

            <select name="channel" id="channel">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div>
            <label for="identity">Identity:</label>

            <select name="identity" id="identity">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>

        </div>
        <div className="KnowledgeBase bordered-section marginalized">
            <div className="section-title">Knowledge base</div>
            generated reading level, comparisons, etc (dactyl)
        </div>
        <div className="InferenceEngine bordered-section marginalized">
          <div class="section-title">Inference engine</div>
          Chain length
        </div>
        <div className="ProcessSelector bordered-section marginalized">
          <div class="section-title">Process selecter</div>
          markov chains, retorts, continuations
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
