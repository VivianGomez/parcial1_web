import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VisualizacionLista extends Component {
  constructor(props) {
    super(props);

    this.visualizacion = this.props.visualizacion;
  }

  render() {
    const titulo = this.visualizacion.titulo;
    const timestamp = this.visualizacion.timestamp;
    const nombreUsuario = this.visualizacion.nombreUsuario;

    return (
      <div className="col-12 mt-4">
          <div className="card w-70  text-dark">
            <div className="card-body">
              <i className="fas fa-chart-bar"/>
              &nbsp;
              <b>TITULO DE LA VISUALIZACIÓN: </b>{titulo}
              <hr />

              <p className="card-text" aling="justify" >
                <i className="fas fa-user text-primary"/>
                 &nbsp; &nbsp; &nbsp;
                <b>Nombre usuario: </b>
                {nombreUsuario}
                <br/>
                &nbsp; &nbsp; &nbsp;&nbsp;
                <i className="fas fa-clock text-primary" />
                &nbsp; &nbsp; &nbsp;
                <b>TimeStamp: </b>
                {timestamp}
              </p>

            </div>
          </div>
      </div>
    );
  }
}

export default VisualizacionLista;
