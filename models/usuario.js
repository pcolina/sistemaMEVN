import mongoose, { Schema } from 'mongoose';

const usuarioSchema = new Schema({
    rol: { type: String, maxlength: 30, required: true },
    name: { type: String, maxlength: 50, unique: true, required: true },
    tipo_documento: { type: String, maxlength: 20 },
    num_documento: { type: String, maxlength: 20 },
    direcccion: { type: String, maxlength: 70 },
    telefono: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 50, unique: true, required: true },
    password: { type: String, maxlength: 80, required: true },
    state: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});


const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;