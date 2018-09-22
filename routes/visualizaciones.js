"use strict";
const config = require("../configurations/database");
const MongoClient = require('mongodb').MongoClient;

function doConnect() {
    MongoClient.connect(config.uri, (err, db) => {
        if(err) { 
            throw err
        } else {
            console.log('Successfully connected to MongoDB')
        }
    })
}
doConnect();

module.exports = router => {

 //buscar una visualizacipon por titulo (o lo hago por id?)
 router.get("/visualizacion/titulo/:titulo", (req, res) => {
    let titulo = req.params.titulo.replace(/_/g, " ");

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
      let visCol = db.collection('visualizaciones');

      visCol.findOne({
        titulo: titulo
      }).then((vis) => {
        if (!vis) {
          res.json({
            exito: false,
            mensaje: 'No se encontró una visualización con el titulo ' + titulo
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

 //get all visualizaciones
 router.get("/visualizaciones/:page", (req, res) => {
    let skip = req.params.page * 20;
    MongoClient.connect(config.uri, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        res.json({
          exito: false,
          mensaje: 'Error ' + err
        })
      } else {
        let db = client.db(config.db);
        // collection de visualizaciones visCol
        let visCol = db.collection('visualizaciones');

        //find all ordenando por timestamp ----------------------------------------------------------------------------------
        visCol.find().sort({timestamp: 1}).skip(skip).limit(20).toArray((err, visAll) => {
          if (err) {
            res.json({
              exito: false,
              mensaje: 'Error ' + err
            });
          } else if (visAll.length === 0) {
            res.json({
              exito: false,
              mensaje: 'No se pudieron cargar las visualizaciones'
            });
          } else {
            res.json({
              exito: true,
              visualizaciones: visAll
            });
          }

          client.close();
        });
      }
    });
  });

   // Crear una visualizacion
  router.post("/visualizaciones", (req, res) => {
    let body = req.body;
    let titulo = body.titulo;
    let nombreUsuario = body.nombreUsuario;
    let timestamp = body.timestamp;
    let datosGrafica = body.datosGrafica;

    if (!titulo) {
      res.json({
        exito: false,
        mensaje: 'Se necesita un titulo para la visualización'
      });
    } else if (!nombreUsuario) {
      res.json({
        exito: false,
        mensaje: 'Se necesita un nombre de usuario para la visualización'
      });
    }  else if (!datosGrafica) {
      res.json({
        exito: false,
        mensaje: 'Se necesitan los datos a graficar'
      });
    } else {
      MongoClient.connect(config.uri, {
        useNewUrlParser: true
      }, (err, client) => {
        if (err) {
          res.json({
            exito: false,
            mensaje: ' ' + err
          });
        } else {
          let db = client.db(config.db);

          let visCol = db.collection('visualizaciones');

          let newVis = {
            titulo: titulo,
            nombreUsuario: nombreUsuario,
            timestamp: new Date(),
            datosGrafica: datosGrafica
          };

          visCol.insertOne(newVis, (err, response) => {
            if (err) {
              res.json({
                exito: false,
                mensaje: 'Error ' + err
              });
            } else {
              res.json({
                exito: true,
                mensaje: 'Se creó la visualización! '
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
