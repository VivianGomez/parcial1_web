import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';
import PP from 'papaparse';
import axios from 'axios';
import GuardarVisualizacion from './GuardarVisualizacion';
import Calificacion from './Calificacion';


class Visualizacion extends Component {

constructor(props){
    super(props);

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeMark = this.handleChangeMark.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeDataCSV = this.handleChangeDataCSV.bind(this);
    this.handleChangeCalificacion = this.handleChangeCalificacion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.apiRatings = '/api/ratings';    
    this.actualizar = this.actualizar.bind(this);

    this.state =
    {
      calificaciones: [],
      crearCalificacion: false,
      error: 'Todo va bien',
      vis : {
        $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
        width: 360,
        data: {
          values: [
          {a: 'A', b: 280}, {a: 'B', b: 55}, {a: 'C', b: 43},
          {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
          {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 520}
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

   handleChangeCalificacion(event) {
     this.setState({ calificacionSeleccionada: event.target.value });
   }

   handleSubmit(event) {
    let errores = [];

    if (
      this.state.calificacionSeleccionada === '-' ||
      this.state.calificacionSeleccionada < 1 ||
      this.state.calificacionSeleccionada > 5
    ) {
      errores.push(<p>&bull;&nbsp;La calificación debe ser entre 1 y 5.</p>);
    }

    if (errores.length === 0) {
      axios
        .post(this.apiRatings, {
          tituloVisualizacion: this.state.tituloVisualizacion,
          nombreDeUsuario: this.state.usuario.nombreDeUsuario,
          calificacion: this.state.calificacion 
        })
        .then(res => {
          let exito = res.data.exito;
          if (!exito) {
            errores.push(
              <p>
                &bull;&nbsp;
                {res.data.mensaje}
              </p>
            );
            this.setState({
              errores: errores
            });
          } else {
            this.setState(
              {
                crearCalificacion: false
              },
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.setState({
        errores: errores
      });
    }

    event.preventDefault();
  }

  componentDidMount(){
    vegaEmbed(this.imagen, this.state.vis, {defaultStyle: true}).catch(console.war)    
  }

  handleChangeMark(event) {
    let spec = Object.assign({}, this.state.vis);    //creating copy of object
    spec.mark = event.target.value;                        //updating value
    this.setState({ vis: spec}, () => vegaEmbed(this.imagen, this.state.vis, {defaultStyle: true}).catch(console.war));
    console.log("EVENT "+event.target.value+" MARK "+this.state.vis.mark);
  }

  handleChangeData(event){
    try{ 
      this.setState({
        vis : JSON.parse(event.target.value), 
        error : 'Todo va bien'}, 
        () => vegaEmbed(this.imagen, this.state.vis, {defaultStyle: true}).catch(console.war)
      );      
    }
    catch(err){
      this.setState({error : err});
      console.log("ERROR! " + err);
    }
  }

  handleChangeDataCSV(datos){
    let spec = Object.assign({}, this.state.vis);    //creating copy of object
    spec.data.values = datos;                        //updating value
    this.setState({vis:spec});
  }


  handleChangeFile(event)
  {
      let file = event.target.files[0];
      PP.parse(file, {
          header: true,
          download: true,
          complete: (results) => {
          console.log(results.data);
              console.log("BEFORE",this.state.vis);
              this.handleChangeDataCSV(JSON.stringify(results.data));
              console.log("AFTER",this.state.vis);
            }
      });
  }

  actualizar() {
    vegaEmbed(this.imagen, this.state.vis,{defaultStyle: true}).catch(console.war) 
  }

mostrarSeccionGuardarVis() {
      return(
          <button
            id="botonParaRegistrarse"
            className="nav-link pointer"
            data-toggle="modal"
            data-target="#registroModal"
          >
            Guardar
          </button>
      );
    }


  render() {
    return (
      <div>
       <div className="container">
         <div className="row">
          <div className="col-6">
            <h5><b>Ingresa tu JSON manualmente:</b></h5>
            <p id="erroresJSON" ><b>{"¿ Cómo va el JSON ? " + this.state.error}</b></p>
            <textarea 
             cols="60" 
             rows="10"
             onChange = {this.handleChangeData}
             defaultValue={JSON.stringify(this.state.vis, null, 2)}>
             </textarea>
             <br/>
             <br/>
             <div>
               <h5>Ingresa un .csv con los datos a graficar:</h5>
               &nbsp;&nbsp;
               <input 
               type="file" 
               id="fileinput"
               className="input-file"
               accept=".csv"
               value={this.state.file}
               onChange={ this.handleChangeFile }
               />
               &nbsp;&nbsp;<button onClick={this.actualizar}>Graficar!</button>
             </div>
          </div>

      <div className="col-6">
        <div className="form-group">
         <label htmlFor="exampleInputSector1">
         <h5><b>Gráfico:</b></h5>
         </label>
         <select
         className="form-control"
         value={this.state.vis.mark}
         onChange={this.handleChangeMark} >
         <option value="bar">Barras</option>
         <option value="point">Puntos</option>
         </select>
        </div>
       <div id="pp"
         ref={(div)=> this.imagen=div}>
      </div>
          <br/>
          <br/>
         <div>
          <button
            id="botonParaRegistrarse"
            className="nav-link pointer"
            data-toggle="modal"
            data-target="#registroModal"
          > Guardar
          </button>
           <GuardarVisualizacion  datosG={this.state.vis}/>
         </div>
     </div> 
   </div> 
  </div>
</div>
      );
  }
}
         //<option value="line">Líneas</option>
         //<option value="area">Área</option>
         //<option value="rect">Recta</option>

export default Visualizacion;