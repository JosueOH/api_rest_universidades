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
		//res.render('eliminar', {data:datos});
  		//res.status(200).json(datos);
  		request.get(process.env.HOST,(err,response,body)=>{
			if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
			else res.render('eliminar',{'info':JSON.parse(body)});
		})
  	}
  });
});
router.post('/d', function(req, res, next) { //metodo que elimina
	//console.log(req.body);
  univ.deleteOne(
  	{'_id': req.body.nombreCompleto},
  	(err,datos)=>{
  		if
  		(err) res.status(500).json({error:"Error"});	
  		if(datos){
			//res.render('editar', {data:datos});//de vuelta a la base de datos
  			//res.status(200).json(datos);
  			request.get(process.env.HOST,(err,response,body)=>{
          		if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
          		else res.render('index',{'info':JSON.parse(body)});
       		 })
  		}
  		});
});

module.exports = router;