import mongoose, { Schema } from 'mongoose';

const categoriaSchema = new Schema({
    name: { type: String, maxlength: 50, unique: true, required: true },
    description: { type: String, maxlength: 250 },
    state: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});


const Categoria = mongoose.model('categoria', categoriaSchema);

export default Categoria;