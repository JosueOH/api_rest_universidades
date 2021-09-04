var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	request.get(process.env.HOST,(err,response,body)=>{
		if(err) res.status(404).json({mensaje:"Error al consumir universidad"});
		else res.render('index',{'info':JSON.parse(body)});
	})
});

module.exports = router;
