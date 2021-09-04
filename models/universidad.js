var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var universidadSchema= Schema({
  nombreCompleto: String,
  siglas: String,
  nivel: {
    Licenciatura: Boolean,
    Maestria: Boolean,
    Doctorado: Boolean,
    PosDoctorado: Boolean
  },
  rankingNacional: Number ,
  numeroDeAlumnos: Number,
  conPosgrado: {
    disponible: Boolean,
    cantidad: Number
  },
  prestigio: Number,
});

module.exports = mongoose.model('Universidad', universidadSchema);
