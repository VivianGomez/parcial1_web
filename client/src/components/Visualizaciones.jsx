import React, { Component } from 'react';
import axios from 'axios';
import VisualizacionLista from './VisualizacionLista';


class Visualizaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exito:false,
      mensaje: '',
      titulo: '',
      nombreUsuario: '',
      timestamp: '',  
      datosGrafica: '',
      error: [],
      visualizaciones: [],
      pagina: 0,
      ruta: '',
      varios: false
    };

    this.api = '/api/visualizaciones/';
    this.separador = '/';
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.titulo !== this.state.titulo ||
      nextProps.nombreUsuario !== this.state.nombreUsuario ||
      nextProps.timestamp !== this.state.timestamp ||
      nextProps.datosGrafica !== this.state.datosGrafica 
    ) { 
         this.setState(
          {
            titulo: nextProps.titulo,
            nombreUsuario: nextProps.nombreUsuario,
            timestamp: nextProps.timestamp, 
            datosGrafica: nextProps.datosGrafica
          },
            () => this.darVisualizaciones(0)
      );
    }
  }

  darVisualizaciones(valor) {
        let ruta = this.api;

        console.log("LA RUTAAAAAAAAAAAAAAAAAAA",ruta + (this.state.pagina + valor))
        axios.get(ruta + (this.state.pagina + valor)).then(res => {
        const exito = res.data.exito;
        if (exito) {
          this.setState({
            exito: exito,
            visualizaciones: res.data.visualizaciones,
            pagina: this.state.pagina + valor,
            ruta: ruta,
            varias: true
          });
        } else {
          this.setState({
            exito: exito,
            mensaje: res.data.mensaje,
            visualizaciones: []
          });
        }
      });
    }
  

  componentDidMount() {
    this.darVisualizaciones(0);
  }

  desplazarEntreVisualizaciones(ruta, valor) {
    if (
      this.state.varias &&
      ((valor === -1 && this.state.pagina >= 1) || valor >= 0)
    ) {
      axios.get(ruta + (this.state.pagina + valor)).then(res => {
        const exito = res.data.exito;
        if (exito) {
          this.setState({
            exito: exito,
            visualizaciones: res.data.visualizaciones,
            pagina: this.state.pagina + valor
          });
        } else {
          this.setState({
            exito: exito,
            mensaje: res.data.mensaje
          });
        }
      });
    }
  }

  botones() {
    let botones = [];

    if (this.state.visualizaciones.length >= 1) {
      if (this.state.pagina !== 0) {
        botones.push(
          <button
            key="atras"
            className="btn btn-dark mt-3 mr-2"
            type="submit"
            onClick={() => this.desplazarEntreVisualizaciones(this.state.ruta, -1)}
          >
            <i className="fas fa-chevron-left" />
          </button>
        );
      }

      if (this.state.visualizaciones.length === 10 || this.state.pagina > 0) {
        botones.push(
          <button
            key="centro"
            type="button"
            className="btn btn-outline-dark mt-3 font-weight-bold"
            disabled
          >
            {this.state.pagina + 1}
          </button>
        );
      }

      if (this.state.visualizaciones.length === 10) {
        botones.push(
          <button
            key="adelanteBloqueado"
            className="btn btn-dark mt-3 ml-2"
            type="submit"
            onClick={() => this.desplazarEntrevisualizaciones(this.state.ruta, 1)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        );
      }
    }

    return botones;
  }

  mostrarVisualizaciones() {
    if (this.state.visualizaciones.length > 0) {
      let visMos = [];
      for (let i = 0; i < this.state.visualizaciones.length; i++) {
        const visualizacion = this.state.visualizaciones[i];
        visMos.push(
          <VisualizacionLista key={visualizacion.titulo} visualizacion={visualizacion} />
        );
      }
      return visMos;
    } 
     else {
      return (
        <div className="alert alert-info mx-auto" role="alert">
          No hay visualizaciones para mostrar.
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <hr />  
        <hr />
        <h3>Visualizaciones guardadas:</h3>
        <div className="row">{this.mostrarVisualizaciones()}</div>
        <div className="text-center">{this.botones()}</div>
      </div>
    );
  }
}

export default Visualizaciones;
