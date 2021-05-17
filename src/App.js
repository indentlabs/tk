import "@blueprintjs/core/lib/css/blueprint.css";
import './Theme.css';
import './BlueprintjsOverrides.css';
import './App.css';
import './Navbar.css';

import React from 'react';
import { Button, Callout, MenuItem, Spinner, SpinnerSize } from "@blueprintjs/core";
import { Tag } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';

var RETORT_URL = 'https://retort-v2.herokuapp.com';
// var RETORT_URL = 'http://localhost:3000';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading_identity_selector: false,
      loading_knowledge_base:    false,
      loading_inference_engine:  false,
      loading_process_selector:  false,
      loading_visualizer_words:  false,
      initializing_visualizer:   false,

      active_mediums_list:     [],
      active_channels_list:    [],
      active_identifiers_list: [],

      selected_medium:     "",
      selected_channel:    "",
      selected_identifier: "",

      // list_of_word_lists:    [
      //   ["There", "Once", "When"],
      //   ["there", "was", "while", "upon"]
      // ],
      // selected_word_in_list: [1, 3]
      list_of_word_lists:    [],
      selected_word_in_list: [],

      cached_word_selections: []
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
      .then((list) => this.setState({ 
        active_mediums_list:        list,
        loading_identity_selector: false
      }));
  }

  load_channels(medium) {
    this.setState({ loading_identity_selector: true });

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      RETORT_URL + '/identities/channels?medium=' + medium, 
      requestOptions
    )
      .then(response => response.json())
      .then((list) => this.setState({ 
        active_channels_list:      list,
        loading_identity_selector: false
      }));
  }

  load_identities(medium) {
    this.setState({ loading_identity_selector: true });

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      RETORT_URL + '/identities/identifiers?medium=' + medium, 
      requestOptions
    )
      .then(response => response.json())
      .then((list) => this.setState({ 
        active_identifiers_list:   list,
        loading_identity_selector: false
      }));
  }

  initialize_visualizer() {
    this.setState({ 
      initializing_visualizer: true,
      list_of_word_lists:      [],
      selected_word_in_list:   []
    });

    // get opening words
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      RETORT_URL + '/bigram/openings?' + this.identity_params_as_url_string(),
      requestOptions
    )
      .then(response => response.json())
      .then((list) => this.setState({
        initializing_visualizer: false,
        list_of_word_lists: [list.map((json) => { return json.after })]
      }));
  }

  identity_params_as_url_string() {
    var identity_params = '';
    if (this.state.selected_medium.length > 0) {
      identity_params += '&medium=' + encodeURIComponent(this.state.selected_medium);
    }
    if (this.state.selected_channel.length > 0) {
      identity_params += '&channel=' + encodeURIComponent(this.state.selected_channel);
    }
    if (this.state.selected_identifier.length > 0) {
      identity_params += '&identifier=' + encodeURIComponent(this.state.selected_identifier);
    }
    
    return identity_params;
  }

  select_chain_word(list_index, word_index, word) {
    var word_selections = this.state.selected_word_in_list;
    word_selections[list_index] = word_index;

    this.setState({
      list_of_word_lists:       this.state.list_of_word_lists.slice(0, list_index + 1),
      selected_word_in_list:    word_selections,
      loading_visualizer_words: true,
      cached_word_selections:   this.state.cached_word_selections.slice(0, list_index).concat(word)
    });
    document.getElementsByClassName('DialogueTreeVisualizer')[0].scrollLeft += 500;

    // Load next word list
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(
      RETORT_URL + '/bigram/consequents?prior=' + word.toLowerCase() + this.identity_params_as_url_string(),
      requestOptions
    )
      .then(response => response.json())
      .then((list) => {
        this.setState({
          initializing_visualizer:  false,
          loading_visualizer_words: false,
          list_of_word_lists:       this.state.list_of_word_lists.slice(0, list_index + 1).concat([list])
        });
        document.getElementsByClassName('DialogueTreeVisualizer')[0].scrollLeft += 500;
      });
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

            <Callout>
              Start by selecting a medium to mimic. You can then select either a channel or identity
              from that medium to further specialize your text generation.
            </Callout>

            <div style={{marginTop: '0.5em'}}>
              <label htmlFor="medium">1.&nbsp; Medium</label>
              <MultiSelect
                items={this.state.active_mediums_list}
                selectedItems={[this.state.selected_medium]}
                placeholder="Select one"
                className="bp3-dark"
                itemRenderer={(item, { modifiers, handleClick }) =>
                  <MenuItem
                    key={item}
                    text={item}
                    onClick={handleClick}
                    active={modifiers.active}
                  />
                }
                onItemSelect={(medium) => {
                  this.setState({
                    selected_medium:     medium,
                    selected_channel:    '',
                    selected_identifier: ''
                  });
                  this.load_channels(medium);
                  this.load_identities(medium);
                }}
                noResults={<MenuItem disabled={true} text="Loading available mediums..." />}
                tagRenderer={item => item}
              />
            </div>
            <div style={{marginTop: '0.5em'}}>
              <label htmlFor="channel">2a. Channel</label>
              <MultiSelect 
                items={this.state.active_channels_list}
                selectedItems={[this.state.selected_channel]}
                placeholder="Select one"
                className="bp3-dark"
                itemRenderer={(item, { modifiers, handleClick }) =>
                  <MenuItem
                    key={item}
                    text={item}
                    onClick={handleClick}
                    active={modifiers.active}
                  />
                }
                noResults={<MenuItem disabled={true} text="No channels available for this medium." />}
                onItemSelect={(channel) => {
                  this.setState({ selected_channel: channel });
                }}
                tagRenderer={item => item}
              />
            </div>
            <div style={{marginTop: '0.5em'}}>
              <label htmlFor="identity">2b. Identity</label>
              <MultiSelect
                items={this.state.active_identifiers_list}
                selectedItems={[this.state.selected_identifier]}
                placeholder="Select one"
                className="bp3-dark"
                itemRenderer={(item, { modifiers, handleClick }) =>
                  <MenuItem
                    key={item}
                    text={item}
                    onClick={handleClick}
                    active={modifiers.active}
                  />
                }
                noResults={<MenuItem disabled={true} text="No identities available for this medium." />}
                onItemSelect={(identifier) => {
                  this.setState({ selected_identifier: identifier });
                }}
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
            Chain length, variance/options slider, style filter, autopunct, etc
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
          { this.state.cached_word_selections.join(' ')}
        </div>

        <div className="Visualizer muted-section padded-section marginalized">
          <div className="muted-section-title">
            Visualizer 
            &nbsp; &#8674; &nbsp;
            { this.state.selected_medium || 'Medium' } 
            &nbsp; &#8674; &nbsp;
            { this.state.selected_channel || 'Channel' } 
            &nbsp; / &nbsp;
            { this.state.selected_identifier || 'Identity' }
          </div>

          <div className="DialogueTreeVisualizer">
            {this.state.list_of_word_lists.length == 0 && (
              <Button
                className="bp3-dark"
                fill={true}
                outlined={true}
                minimal={true}
                loading={this.state.initializing_visualizer}
                intent="primary"
                onClick={() => { this.initialize_visualizer(); }}
              >
                Start a chain
              </Button>
            )}

            {this.state.list_of_word_lists.map((word_list, i) => {
              return (
                <ul className="WordList" key={i}>
                  {word_list.map((word, j) => {
                    var word_class = (this.state.selected_word_in_list[i] == j)
                      ? 'selected' 
                      : '';
                    return(
                      <li
                        className={word_class}
                        key={j}
                        onClick={() => {
                          this.select_chain_word(i, j, word);
                        }}
                      >
                        { word }
                      </li>
                    )
                  })}
                </ul>
              )
            })}
            { this.state.loading_visualizer_words && (
              <Spinner size={SpinnerSize.LARGE} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
