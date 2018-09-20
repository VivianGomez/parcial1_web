import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);
		this.state=
		{
			vis : {
				"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
				"description": "A scatterplot showing horsepower and miles per gallons for various cars.",
				"data": {"url": "data/cars.json"},
				"mark": "point",
				"encoding": {
					"x": {"field": "Horsepower","type": "quantitative"},
					"y": {"field": "Miles_per_Gallon","type": "quantitative"}
				}
			}

		}
	}


	render() {
		return (
			<div className="App">
			<header>
			<h1>Parcial 1 WEB</h1>
			</header>

			<div>
			<div className="row">
			<input type="file" id="fileinput"/>
			</div>
			</div>

			<div>
			<textarea 
			cols="40" 
			rows="30"
			ref={(div)=> this.dTarget=div}>
			Div para mostrar el JSON
			</textarea>
			<div
			ref={(div)=> this.imagen=div


			const view = vegaEmbed("#vis", spec, embed_opt)
      .catch(error => showError(el, error))
			.then((res) =>  res.view.insert("myData", myData).run());

			}>

			</div>

			<div className="row">
			<button onClick={()=> {
				var obj ={
					"x":"algo",
					"y":{"field":"Probando visualizacion", "type": "quantitative"}
				}

				this.dTarget.value=JSON.stringify(obj);
			}}> Ver JSON </button>
			</div>
			</div>


			</div>
			);
	}
}

export default App;
