var express = require('express');
var router = express.Router();
var request = require('request');

var mongoose = require('mongoose');
var univ = require('../models/universidad');
mongoose.set('useFindAndModify', false);
/* GET home page. */
router.get('/', function(req, res, next) {
  univ.find({},(err,datos)=>{
  	if(err) res.status(500).json({error:"Error"});
  	if(datos){
		//res.render('modificar', {data:datos});
  		//res.status(200).json(datos);
         request.get(process.env.HOST,(err,response,body)=>{
            if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
            else res.render('premodificar',{'info':JSON.parse(body)});
      })
  	}
  });
});
router.post('/plantilla', function(req, res, next) {
  console.log(req.body);
  univ.find({'_id':req.body._id},(err,datos)=>{
    if(err) res.status(500).json({error:"Error"});
    if(datos){
      res.render('modificar', {data:datos});
      console.log(datos);
      //res.status(200).json(datos);
     /* request.get(process.env.HOST,(err,response,body)=>{
            if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
            else res.render('modificar',{'info':JSON.parse(body)});
      })*/
    }
  });
});
router.post('/m', function(req, res, next) { //metodo que modifica
	console.log(req.body);
  univ.findOneAndUpdate(
  	{'_id': req.body._id2},
  	{'nombreCompleto': req.body.nombreCompleto2,
    'siglas':  req.body.siglas2,
    'nivel.Licenciatura':  req.body.Licenciatura2,
    'nivel.Maestria':  req.body.Maestria2,
    'nivel.Doctorado':  req.body.Doctorado2,
    'nivel.PosDoctorado':  req.body.PosDoctorado2,
 	'rankingNacional':  req.body.rankingNacional2 ,
  	'numeroDeAlumnos':  req.body.numeroDeAlumnos2,
    'conPosgrado.disponible':  req.body.disponible2,
    'conPosgrado.cantidad':  req.body.cantidad2,
  	'prestigio':  req.body.prestigio2},
  	(err,datos)=>{
  		if
  		(err) res.status(500).json({error:"Error"});	
  		if(datos){
			//res.render('editar', {data:datos});
  		//res.status(200).json(datos);
        request.get(process.env.HOST,(err,response,body)=>{
          if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
          else res.render('index',{'info':JSON.parse(body)});
        })
  		}
  		});
});
router.patch('/:siglas', function(req, res, next) { 
  univ.findOneAndUpdate(
  	{'siglas': req.params.siglas},{$set:req.body},
  	(err,datos)=>{
  		if(err) res.status(500).json({error:"Error"});
  		if(datos){
			//res.render('editar', {data:siglas});
  			res.status(200).json(datos);
  		}
  		});
});
module.exports = router;