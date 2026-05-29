const mongoose = require('mongoose');

const conectarBanco = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shedrive');
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar no MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = conectarBanco;
