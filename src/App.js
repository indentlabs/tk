import "@blueprintjs/core/lib/css/blueprint.css";
import './Theme.css';
import './App.css';
import './Navbar.css';

import React from 'react';
import { MenuItem, Spinner, SpinnerSize } from "@blueprintjs/core";
import { Tag } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';

// var RETORT_URL = 'https://retort-v2.herokuapp.com';
var RETORT_URL = 'http://localhost:3000';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading_identity_selector: false,
      loading_knowledge_base:    false,
      loading_inference_engine:  false,
      loading_process_selector:  false,

      active_medium_list: []
    }
    console.log('loading');
  }

  componentDidMount() {
    this.load_mediums();
  }

  load_mediums() {
    this.setState({ loading_identity_selector: true });

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(RETORT_URL + '/identities/mediums', requestOptions)
        .then(response => response.json())
        .then(list => this.setState({ 
          active_medium_list:        list,
          loading_identity_selector: false
        }));
  }

  render() {
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
              {this.state.loading_identity_selector && (
                <Spinner intent="success" size={SpinnerSize.SMALL} className='float-right' />
              )}
            </div>
            <img src="https://i.imgur.com/Fv6NiyJ.png" className="avatar" />
            <div>
              <label for="medium">Medium:</label>
              <MultiSelect items={this.state.active_medium_list}
                placeholder="Medium"
                itemRenderer={(item, { modifiers, handleClick }) =>
                  <MenuItem
                    key={item}
                    text={item}
                    onClick={handleClick}
                    active={modifiers.active}
                  />
                }
                onItemSelect={(item) => { console.log('selected item ' + item) }}
                tagRenderer={item => item}
              />
            </div>
            <div>
              <label for="channel">Channel:</label>
              <MultiSelect items={[1, 2, 3, 4, 5, 6, 'ghjgh']}
                placeholder="Channel"
                itemRenderer={(item, { modifiers, handleClick }) =>
                  <MenuItem
                    key={item}
                    text={item}
                    onClick={handleClick}
                    active={modifiers.active}
                  />
                }
                onItemSelect={(item) => { console.log('selected item ' + item) }}
                tagRenderer={item => item}
              />
            </div>
            <div>
              <label for="identity">Identity:</label>
              <MultiSelect items={[1, 2, 3, 4, 5, 6, 'ghjgh']}
                placeholder="Identity"
                itemRenderer={(item, { modifiers, handleClick }) =>
                  <MenuItem
                    key={item}
                    text={item}
                    onClick={handleClick}
                    active={modifiers.active}
                  />
                }
                onItemSelect={(item) => { console.log('selected item ' + item) }}
                tagRenderer={item => item}
              />
            </div>
          </div>
          <div className="KnowledgeBase bordered-section marginalized">
              <div className="section-title">
                Knowledge base
                {this.state.loading_knowledge_base && (
                  <Spinner intent="success" size={SpinnerSize.SMALL} className='float-right' />
                )}
              </div>
              <div>
                generated reading level, comparisons, etc (dactyl)
              </div>
              <Tag fill={false} intent="warning" interactive={false} icon="user" rightIcon="dashboard" onClick={() => { console.log('clicked this tag') }}>
                Test
              </Tag>
          </div>
          <div className="InferenceEngine bordered-section marginalized">
            <div className="section-title">
              Inference engine
              {this.state.loading_inference_engine && (
                <Spinner intent="success" size={SpinnerSize.SMALL} className='float-right' />
              )}
            </div>
            Chain length
          </div>
          <div className="ProcessSelector bordered-section marginalized">
            <div className="section-title">
              Process selecter
              {this.state.loading_process_selector && (
                <Spinner intent="success" size={SpinnerSize.SMALL} className='float-right' />
              )}
            </div>
            markov chains, retorts, continuations
          </div>
        </div>

        <div className="Output highlighted-section padded-section marginalized">
          Output
        </div>

        <div className="Visualizer muted-section padded-section marginalized">
          <div className="muted-section-title">
            Visualizer &#8674; Medium &#8674; Channel / Identity
          </div>
          <div className="DialogueTreeVisualizer">
            <ul className="WordList">
              <li>There</li>
              <li>The</li>
              <li>In</li>
              <li className="selected">Once</li>
              <li>It</li>
              <li>When</li>
              <li>While</li>
            </ul>
            <ul className="WordList">
              <li>There</li>
              <li>The</li>
              <li>In</li>
              <li className="selected">Once</li>
              <li>It</li>
              <li>When</li>
              <li>While</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
