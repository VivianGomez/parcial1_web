import React, { Component } from 'react';
import axios from 'axios';


class GuardarVisualizacion extends Component {
  constructor(props) {
    super(props);

    this.datosG = this.props.datosG;
    this.handleChangeTitulo = this.handleChangeTitulo.bind(this);
    this.handleChangeNombreDeUsuario = this.handleChangeNombreDeUsuario.bind(this);
    this.handleChangeDatosGrafica = this.handleChangeDatosGrafica.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      titulo: '',
      nombreUsuario: '',
      datosGrafica: '',
      error: []
    };
  }

  handleChangeTitulo(event) {
    this.setState({ titulo: event.target.value });
  }

  handleChangeNombreDeUsuario(event) {
    this.setState({ nombreUsuario: event.target.value });
  }
  handleChangeDatosGrafica(event) {
    this.setState({ datosGrafica: event.target.value });
  }


  handleSubmit(event) {

    console.log("DATOS GRAPH ACTUAL HANDLE", this.props.datosG);
    const dd = JSON.stringify(this.props.datosG);


    let errores = [];

    if (this.state.titulo.length < 3) {
      errores.push(
        <p>&bull;&nbsp;El título de la visualización debe tener al menos 3 carateres.</p>
        );
    }

    if (
      this.state.nombreUsuario.length < 3 ||
      this.state.nombreUsuario.length > 15
      ) {
      errores.push(
        <p>
        &bull;&nbsp;El nombre de usuario debe tener entre 3 y 15 carateres.
        </p>
        );
  }   


 if (errores.length === 0) {
    axios
    .post('/api/visualizaciones', {
      titulo: this.state.titulo,
      nombreUsuario: this.state.nombreUsuario,
      datosGrafica: dd
    })
    .then(res => {
      let exito = res.data.exito;
      console.log("EXITO", exito)
      alert("Se  guardó la visualización");
      if (!exito) {
        errores.push(
          <p>
          &bull;&nbsp;
          {res.data.mensaje}
          </p>
          );
        this.setState({
          error: errores
        });
      } 
    })
    .catch(function(error) {
      console.log(error);
    });
  } else {
    alert("No se pudo guardar la visualización");
    console.log(errores)
    this.setState({
      error: errores
    });
  }

  event.preventDefault();
}

mostrarError() {
  if (this.state.error.length > 0) {
    return (
      <div className="alert alert-danger letra-pequenia" role="alert">
      {this.state.error}
      </div>
      );
  }
}

render() {

    console.log("DATOS GRAPH ACTUAL ", this.props.datosG);

  return (
    <div
     className="container-fluid modal fade"
     id="registroModal"
     tabIndex="-1"
     role="dialog"
     aria-labelledby="exampleModalLabel"
     aria-hidden="true"
    >
     <div
      className="modal-dialog modal-dialog-centered modal-lg"
      role="document"
     >
       <div className="modal-content">
        <div className="modal-header bg-dark text-light">
         <center>
          <h5 className="modal-title" id="exampleModalLabel">
           Guardar visualización
          </h5>
         </center>
         <button
          type="button"
          id="cerrarRegistroModal"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
         >
           <span className="text-light" aria-hidden="true">
           &times;
           </span>
         </button>
        </div>
        <div className="modal-body">
          <form onSubmit={this.handleSubmit}>
           <div className="form-group">
            <label htmlFor="guardarInputTitulo">
             <b>Titulo visualización</b>
            </label>
             <input
              type="text"
              className="form-control"
              id="guardarInputTitulo"
              value={this.state.value}
              onChange={this.handleChangeTitulo}
              required
             />
            </div>
        <div className="form-group">
           <label htmlFor="guardarInputUsuario">
            <b>Nombre de usuario</b>
           </label>
           <input
             type="text"
             className="form-control"
             id="guardarInputUsuario"
             value={this.state.value}
             onChange={this.handleChangeNombreDeUsuario}
             required
           />
         </div>
            <center>
            {this.mostrarError()}
             <button type="submit" className="btn btn-primary">
              Guardar
             </button>
            </center>
         </form>
        </div>
      </div>
     </div>
   </div>
  );
 }
}
export default GuardarVisualizacion;
