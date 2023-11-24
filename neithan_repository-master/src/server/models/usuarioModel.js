// Importa los módulos necesarios
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define un nuevo esquema para tus usuarios utilizando la funcionalidad de esquemas de Mongoose
const userSchema = new mongoose.Schema(
    {
        // Define un campo 'nombreU' con tipo de datos String
        nombreU: {
            type: String
        },
        
        // Define un campo 'emailU' con tipo de datos String
        emailU: {
            type: String
        },
        
        // Define un campo 'contraseña' con tipo de datos String
        contraseña: {
            type: String
        }
    }
);

// Acción pre-save: se ejecuta antes de guardar un nuevo usuario en la base de datos
userSchema.pre('save', async function(next){
    // Genera una sal para el hashing de la contraseña
    const sal = await bcryptjs.genSalt(10);

    // Encripta la contraseña utilizando la sal
    this.contraseña = await bcryptjs.hash(this.contraseña, sal);
});

// Método para construir el JSON Web Token (JWT) asociado al usuario
userSchema.methods.ObtenerTokenJWT = function(){
    const JWT_SECRET_KEY = "mascotasOnline";

    // Crea y firma el JWT con la información del usuario
    return jwt.sign({
        id: this._id,
        nombreU: this.nombreU,
        contraseña: this.contraseña,
        email: this.emailU,
    }, 
        JWT_SECRET_KEY, 
        { 
            expiresIn: Date.now() + 10000
        }
    );
};

// Método para comparar la contraseña proporcionada con la almacenada en la base de datos
userSchema.methods.comparePassword = async function(contraseña){
    return await bcryptjs.compare(contraseña, this.contraseña);
};

// Crea un modelo llamado 'User' utilizando el esquema 'userSchema'
const User = mongoose.model('User', userSchema);

// Exporta el modelo 'User' para que pueda ser utilizado en otros archivos
module.exports = User;
