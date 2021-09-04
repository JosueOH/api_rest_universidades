const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const Universidad = require('../models/universidad');

router.get('/universidades', async (req, res)=> {
  const universidad= await Universidad.find();
  res.json(universidad);
});

router.get('/universidades/:siglas',(req, res, next)=> {
  Universidad.findOne({'siglas':req.params.siglas},(err,retorno)=>{
    if(retorno==null){
      res.status(404).json({mensaje:"Not found"});
    }else{
      res.status(200).json(retorno);
    }
  });
});

module.exports = router;
