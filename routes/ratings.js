"use strict";
const config = require("../configurations/database");
const MongoClient = require('mongodb').MongoClient;

module.exports = router => {

 //get all ratings
 router.get("/ratings", (req, res) => {
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
        ratingsCol.find().sort({calificacion: 1}).skip(skip).limit(20).toArray((err, visAll) => {
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
  router.post("/ratings", (req, res) => {
    let body = req.body;
    let tituloVisualizacion = body.tituloVisualizacion;
    let nombreUsuario = body.nombreUsuario;
    let calificacion = body.calificacion;

    if (!tituloVisualizacion) {
      res.json({
        success: false,
        message: 'Se necesita el titulo de la visualización a calificar'
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
            tituloVisualizacion: tituloVisualizacion,
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
   

  return router;
};
