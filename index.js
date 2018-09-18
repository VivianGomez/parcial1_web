// javascript en modo estricto
"use strict";

//Express framework para ejecutar el Back-End con Node.js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World! EXPRESSSSSSSSSS!!!!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});