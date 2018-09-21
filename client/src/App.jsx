import React, { Component } from 'react';
import logo from './logo.svg';
import vegaEmbed from 'vega-embed';
import Papa from 'papaparse';
import './App.css';
//[{"a":"A","b":"28"}, {"a":"B","b":"55"}, {"a": "C","b":"43"},{"a": "D","b":"91"},{"a":"E","b":"81"},{"a":"F","b": "53" },{"a": "G", "b": "19" },{ "a": "H", "b": "87" },{ "a": "I", "b": "52" }]

class App extends Component {

  constructor(props){
    super(props);

    this.updateData = this.updateData.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeMark = this.handleChangeMark.bind(this);

    this.state =
    {
      file:'',
      dataFile:'',
      submitted: false,
      filesubmitted: false,
      data:{ a: 'A', b: 28 },
      error: 'Todo va bien',
      mark:'bar',
      vis : {
        $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
        width: 360,
        data: {
          values: [
          {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
          {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
          {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
          ],
          name: 'source'
        },
        selection: {
          a: {type: 'single'}
        },
        mark: 'bar',
        encoding: {
          x: {field: 'a', type: 'ordinal'},
          y: {field: 'b', type: 'quantitative'},
          tooltip: {field: 'b', type: 'quantitative'},
          color: {
            condition: {selection: 'a', value: 'steelblue'},
            value: 'grey'
          }
        }
      }
    };
  }



 // handleChange(event) {
 //   this.setState({value: event.target.value});
 // }


  updateData(result) {
    var data = result;
    this.setState({ filesubmitted: true });
    this.setState({ dataFile: data});
  }

  handleChangeFile(event)
  {
    var datosString='';
    let file = event.target.files[0];
    console.log()
    Papa.parse(file, {
      header: true,
      download: true,
      complete: (results) => {
        this.updateData(results.data);
      }
    });
  }

  componentDidMount(){
    console.log("HOLAAA", this.state.vis)
    vegaEmbed(this.imagen, this.state.vis, {defaultStyle: true}).catch(console.war)    
  }


  handleSubmit(event) {
    if(this.state.value !== ''){
      var obj;
      event.preventDefault();
      try {
        obj = JSON.parse(this.state.value);
      } catch(e) {
        alert(e); 
      }
      this.setState({ submitted: true });
    }
  }


  handleChangeMark(event) {
    this.setState({ mark:event.target.value});
    console.log("EVENT "+event.target.value+" MARK "+this.state.mark);
  }

  handleChangeData(event){
    try{ 
      this.setState({vis : JSON.parse(event.target.value), error : 'Todo va bien'}, () => vegaEmbed(this.imagen, this.state.vis, {defaultStyle: true}).catch(console.war));
      //this.state.data = JSON.parse(event.target.value);
      

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
      <br/>
      </header>

      <div className="container">
      <div className="row">
      <div className="col-6">
      <p>Ingresa tu JSON manualmente:</p>
      <p><b>{"¿ Cómo va el JSON ? " + this.state.error}</b></p>
      <textarea 
      cols="40" 
      rows="10"
      onChange = {this.handleChangeData}
      defaultValue={JSON.stringify(this.state.vis, null, 2)}>
      </textarea>
      <br/>
      <div>
      <p>Ingresa un .csv con los datos a graficar:</p>
      <input 
      type="file" 
      id="fileinput"
      className="input-file"
      accept=".csv"
      value={this.state.file}
      onChange={ this.handleChangeFile }
      />
      </div>
      </div>

      <div className="col-6">
      <div className="form-group">
      <label htmlFor="exampleInputSector1">
      <b>Tipo de gráfico:</b>
      </label>
      <select
      className="form-control"
      value={this.state.mark}
      onChange={this.handleChangeMark} >
      <option value="bar">Barras</option>
      <option value="point">Puntos</option>
      <option value="line">Líneas</option>
      <option value="area">Área</option>
      <option value="rect">Recta</option>
      </select>
      </div>
      <div id="pp"
      ref={(div)=> this.imagen=div}>
      </div>
      </div> 
      </div> 
      </div>

      </div>
      );
  }
}

export default App;
