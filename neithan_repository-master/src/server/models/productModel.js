// Importa el módulo 'mongoose' que te permite interactuar con MongoDB desde Node.js
const mongoose = require('mongoose');

// Define un nuevo esquema para tus citas utilizando la funcionalidad de esquemas de Mongoose
const citaSchema = new mongoose.Schema(
    {
       // Define un campo 'nombre' con tipo de datos String
       nombre: {
            type: String
       },
       
       // Define un campo 'marca' con tipo de datos String
       marca: {
            type: String
       },
       
       // Define un campo 'descripcion' con tipo de datos String
       descripcion: {
            type: String
       },
       
       // Define un campo 'fechaCreacion' con tipo de datos Date y valor predeterminado la fecha actual
       fechaCreacion: {
            type: Date,
            default: Date.now
       }
    }
);

// Crea un modelo llamado 'Cita' utilizando el esquema 'citaSchema'
const Cita = mongoose.model('Cita', citaSchema);

// Exporta el modelo 'Cita' para que pueda ser utilizado en otros archivos
module.exports = Cita;
