import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Visualizacion from './components/Visualizacion';
import Visualizaciones from './components/Visualizaciones';


import './App.css';
//[{"a":"A","b":"28"}, {"a":"B","b":"55"}, {"a": "C","b":"43"},{"a": "D","b":"91"},{"a":"E","b":"81"},{"a":"F","b": "53" },{"a": "G", "b": "19" },{ "a": "H", "b": "87" },{ "a": "I", "b": "52" }]

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
        <h1> React Vega-Embed  </h1>
        <br/>
        </header>
        <div>
          <Visualizacion/>
        </div>
        <div className="container">
          <Visualizaciones/>
        </div>   
      </div>
      );
  }
}

export default App;
