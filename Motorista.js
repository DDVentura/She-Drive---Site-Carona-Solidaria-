const mongoose = require('mongoose');

const motoristaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    carro: { type: String, required: true },
    vagas: { type: Number, required: true },
    rotas: { type: String, required: true },
    observacoes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Motorista', motoristaSchema);
