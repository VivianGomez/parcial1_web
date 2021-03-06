"use strict";
const config = require("../configurations/database");
const MongoClient = require('mongodb').MongoClient;

module.exports = router => {

 //get all ratings
 router.get("/ratings/all", (req, res) => {
    MongoClient.connect(config.uri, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        res.json({
          success: false,
          message: 'Error ' + err
        })
      } else {
        let db = client.db(config.db);
        // collection de ratings ratingsCol
        let ratingsCol = db.collection('ratings');

        //find all ordenando por calificacion ----------------------------------------------------------------------------------
        ratingsCol.find().sort({calificacion: 1}).toArray((err, visAll) => {
          if (err) {
            res.json({
              success: false,
              message: 'Error ' + err
            });
          } else if (visAll.length === 0) {
            res.json({
              success: false,
              message: 'No se pudieron cargar los ratings'
            });
          } else {
            res.json({
              success: true,
              ratings: visAll
            });
          }

          client.close();
        });
      }
    });
  });

   // Crear un rating
  router.post("/ratings/new", (req, res) => {
    let body = req.body;
    let tituloVisualizacionVisualizacion = body.tituloVisualizacionVisualizacion;
    let nombreUsuario = body.nombreUsuario;
    let calificacion = body.calificacion;

    if (!tituloVisualizacionVisualizacion) {
      res.json({
        success: false,
        message: 'Se necesita el tituloVisualizacion de la visualización a calificar'
      });
    } else if (!nombreUsuario) {
      res.json({
        success: false,
        message: 'Se necesita un nombre de usuario de quien hace la calificación'
      });
    } else if (!calificacion) {
      res.json({
        success: false,
        message: 'Se necesita una calificacion para la visualización'
      });
    } else {

      MongoClient.connect(config.uri, {
        useNewUrlParser: true
      }, (err, client) => {
        if (err) {
          res.json({
            success: false,
            message: 'Error ' + err
          });
        } else {
          let db = client.db(config.db);

          let ratingsCol = db.collection('ratings');

          let newRating = {
            tituloVisualizacionVisualizacion: tituloVisualizacionVisualizacion,
            nombreUsuario: nombreUsuario,
            calificacion: calificacion 
          };

          ratingsCol.insertOne(newRating, (error, response) => {
            if (err) {
              res.json({
                success: false,
                message: 'Error ' + error
              });
            } else {
              res.json({
                success: true,
                message: 'Se creó la calificación! '
              });
            }
          });
        }

        client.close();
      });
    }
  });

   //buscar una calif por tituloVisualizacion de la visualización 
 router.get("/ratings/tituloVisualizacion/:tituloVisualizacion", (req, res) => {
    let tituloVisualizacion = req.params.tituloVisualizacion.replace(/_/g, " ");

    MongoClient.connect(config.uri, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        res.json({
          exito: false,
          mensaje: 'Error ' + err
        });
      };

      let db = client.db(config.db);
      let visCol = db.collection('ratings');

      visCol.findOne({
        tituloVisualizacion: tituloVisualizacion
      }).then((vis) => {
        if (!vis) {
          res.json({
            exito: false,
            mensaje: 'No se encontró una visualización con el tituloVisualizacion ' + tituloVisualizacion
          });
        } else {
          res.json({
            exito: true,
            visualizacion: vis
          })
        }
        client.close();
      });
    });
  });
   

  return router;
};
