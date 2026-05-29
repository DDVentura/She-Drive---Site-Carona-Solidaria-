const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
    origem: { type: String, required: true },
    destino: { type: String, required: true },
    data: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Historico', historicoSchema);
