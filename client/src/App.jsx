import React, { Component } from 'react';
import logo from './logo.svg';
import vegaEmbed from 'vega-embed';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChangeData = this.handleChangeData.bind(this);
    
    this.state=
    {
      data:{ a: 'A', b: 28 },
      error: 'Todo va bien',
      vis : {
       $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
       description: 'A simple bar chart with embedded data.',
       width: 360,
       data: {
         values: [
         { a: 'A', b: 28 },
         { a: 'B', b: 55 },
         { a: 'C', b: 43 },
         { a: 'D', b: 91 },
         { a: 'E', b: 81 },
         { a: 'F', b: 53 },
         { a: 'G', b: 19 },
         { a: 'H', b: 87 },
         { a: 'I', b: 52 }
         ]
       },
       mark: 'bar',
       encoding: {
         x: { field: 'a', type: 'ordinal' },
         y: { field: 'b', type: 'quantitative' },
         tooltip: { field: 'b', type: 'quantitative' }
       }
     }

   };
}



handleChangeData(event){
  try{ 
      this.setState({error : 'Todo va bien'});
      this.setState({data : JSON.parse(event.target.value)});
      //this.state.data = JSON.parse(event.target.value);
      vegaEmbed(this.imagen, {
       $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
       description: 'A simple bar chart with embedded data.',
       width: 360,
       data: {
         values: this.state.data
       },
       mark: 'bar',
       encoding: {
         x: { field: 'a', type: 'ordinal' },
         y: { field: 'b', type: 'quantitative' },
         tooltip: { field: 'b', type: 'quantitative' }
       }
     }, {defaultStyle: true}).catch(console.war);

  }
  catch(err){
      this.setState({error : err});
      console.log("ERROR! " + err);
  }
}


render() {
  return (
  <div className="App">
    <header>
    <h1>Parcial 1 WEB</h1>
    <h5>{"¿ Como va el JSON ? " + this.state.error}</h5>
    <br/>
    </header>

    <div className="container">
      <div className="row">
      <div className="col-6">
       <p>Ingresa tu JSON manualmente:</p>
        <textarea 
        cols="40" 
        rows="10"
        onChange = {this.handleChangeData}
        defaultValue="Escribe tu JSON !">
        </textarea>
        <br/>
        <div>
           <p>Ingresa un .csv con los datos a graficar:</p>
           <input type="file" id="fileinput"/>
        </div>
      </div>

      <div className="col-6">
        <p>Visualización:</p>
        <div ref={(div)=> this.imagen=div}></div>
      </div> 
     </div> 
    </div>

  </div>
  );
}
}

export default App;
