import React, { Component } from 'react';

class Calificacion extends Component {
  constructor(props) {
    super(props);

    this.calificacion = this.props.calificacion;
  }

  render() {

    const tituloVisualizacion = this.calificacion.texto;
    const nombreUsuario = this.calificacion.nombreUsuario;
    const calificacion = this.calificacion.nombreUsuario;

    return (
      <div className="col-12 mt-4">
        <div className="card w-100 shadow text-dark">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <i className="fas fa-star" />
                    &nbsp;
                    {calificacion}
                  </div>
                  <div className="col-12">
                    <i className="far fa-list-alt" />
                    &nbsp;
                    {nombreUsuario}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calificacion;
