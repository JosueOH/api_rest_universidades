var express = require('express');
var request = require('request');

const router = express.Router();
const Universidad = require('../models/universidad');
const mongoose = require('mongoose');

router.get('/', async(req, res)=>{
  res.render('agregar',{mensaje:"placeholder",});
});

router.post('/agregar_nuevo', async(req, res)=>{
  const newUniversidad= new Universidad({
    nombreCompleto: req.body.nombreCompleto,
    siglas: req.body.siglas,
    nivel:{
      Licenciatura: Boolean(req.body.Licenciatura),
      Maestria: Boolean(req.body.Maestria),
      Doctorado: Boolean(req.body.Doctorado),
      PosDoctorado: Boolean(req.body.PosDoctorado),
    },
    rankingNacional: req.body.rankingNacional,
    numeroDeAlumnos: req.body.numeroDeAlumnos,
    conPosgrado:{
      disponible: Boolean(req.body.disponible),
      cantidad:req.body.cantidad,
    },
    prestigio: req.body.prestigio,
  })
  await newUniversidad.save((error, uni)=>{
    if(error){
      res.status(404).json({mensaje: "Fallo al guardar"});
    }else{
      //res.status(201).json(uni);
      request.get(process.env.HOST,(err,response,body)=>{
          if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
          else res.render('index',{'info':JSON.parse(body)});
      })
    }
  });
});

module.exports = router;
