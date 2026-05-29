const mongoose = require('mongoose');

const passágeiraSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    origem: { type: String, required: true },
    destino: { type: String, required: true },
    preferencias: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Passageira', passágeiraSchema);
