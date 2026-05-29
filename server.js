const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/db');
const Motorista = require('./models/Motorista');
const Passageira = require('./models/Passageira');
const Historico = require('./models/Historico');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

conectarBanco();

// --- LOGIN ---
app.post('/api/auth/login', async (req, res) => {
    const { email, password, tipo } = req.body;

    if (!email || !password) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    if (!tipo || !['motorista', 'passageira'].includes(tipo)) {
        return res.status(400).json({ erro: 'Informe o tipo de conta: motorista ou passageira.' });
    }

    try {
        let usuario = null;

        if (tipo === 'motorista') {
            usuario = await Motorista.findOne({ email, senha: password });
        } else {
            usuario = await Passageira.findOne({ email, senha: password });
        }

        if (!usuario) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos para este tipo de conta.' });
        }

        res.status(200).json({ mensagem: 'Login realizado com sucesso!', tipo, usuario });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao realizar login.' });
    }
});

// --- MOTORISTAS ---
app.get('/api/motoristas', async (req, res) => {
    try {
        const motoristas = await Motorista.find();
        // Mapeia para o formato que o frontend espera
        const resultado = motoristas.map(m => ({
            _id: m._id,
            name: m.nome,
            phone: m.telefone,
            car: m.carro,
            seats: m.vagas,
            route: m.rotas,
            comments: m.observacoes
        }));
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar motoristas.' });
    }
});

app.post('/api/motoristas', async (req, res) => {
    const { name, phone, car, seats, route, comments, email, senha } = req.body;
    try {
        const nova = new Motorista({
            nome: name,
            email: email || `motorista_${Date.now()}@shedrive.com`,
            senha: senha || '123456',
            telefone: phone,
            carro: car,
            vagas: seats,
            rotas: route,
            observacoes: comments
        });
        await nova.save();
        res.status(201).json({ mensagem: 'Motorista cadastrada!', motorista: nova });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao cadastrar motorista.' });
    }
});

app.put('/api/motoristas/:id', async (req, res) => {
    const { name, phone, car, seats, route, comments } = req.body;
    try {
        const motorista = await Motorista.findByIdAndUpdate(
            req.params.id,
            { nome: name, telefone: phone, carro: car, vagas: seats, rotas: route, observacoes: comments },
            { new: true }
        );
        if (!motorista) return res.status(404).json({ erro: 'Motorista não encontrada.' });
        res.status(200).json({ mensagem: 'Motorista atualizada!', motorista });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar motorista.' });
    }
});

app.delete('/api/motoristas/:id', async (req, res) => {
    try {
        const motorista = await Motorista.findByIdAndDelete(req.params.id);
        if (!motorista) return res.status(404).json({ erro: 'Motorista não encontrada.' });
        res.status(200).json({ mensagem: 'Motorista removida!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao remover motorista.' });
    }
});

// --- PASSAGEIRAS ---
app.get('/api/passageiras', async (req, res) => {
    try {
        const passageiras = await Passageira.find();
        const resultado = passageiras.map(p => ({
            _id: p._id,
            name: p.nome,
            phone: p.telefone,
            origin: p.origem,
            destination: p.destino,
            preferences: p.preferencias
        }));
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar passageiras.' });
    }
});

app.post('/api/passageiras', async (req, res) => {
    const { name, phone, origin, destination, preferences, email, senha } = req.body;
    try {
        const nova = new Passageira({
            nome: name,
            email: email || `passageira_${Date.now()}@shedrive.com`,
            senha: senha || '123456',
            telefone: phone,
            origem: origin,
            destino: destination,
            preferencias: preferences
        });
        await nova.save();
        res.status(201).json({ mensagem: 'Passageira cadastrada!', passageira: nova });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao cadastrar passageira.' });
    }
});

app.put('/api/passageiras/:id', async (req, res) => {
    const { name, phone, origin, destination, preferences } = req.body;
    try {
        const passageira = await Passageira.findByIdAndUpdate(
            req.params.id,
            { nome: name, telefone: phone, origem: origin, destino: destination, preferencias: preferences },
            { new: true }
        );
        if (!passageira) return res.status(404).json({ erro: 'Passageira não encontrada.' });
        res.status(200).json({ mensagem: 'Passageira atualizada!', passageira });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar passageira.' });
    }
});

app.delete('/api/passageiras/:id', async (req, res) => {
    try {
        const passageira = await Passageira.findByIdAndDelete(req.params.id);
        if (!passageira) return res.status(404).json({ erro: 'Passageira não encontrada.' });
        res.status(200).json({ mensagem: 'Passageira removida!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao remover passageira.' });
    }
});

// --- HISTÓRICO ---
app.get('/api/history', async (req, res) => {
    try {
        const historico = await Historico.find().sort({ createdAt: -1 });
        const resultado = historico.map(h => ({
            _id: h._id,
            origin: h.origem,
            destination: h.destino,
            date: h.data
        }));
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar histórico.' });
    }
});

app.post('/api/history', async (req, res) => {
    const { origin, destination, date } = req.body;
    try {
        const novo = new Historico({ origem: origin, destino: destination, data: date });
        await novo.save();
        res.status(201).json({ mensagem: 'Rota salva no histórico!', historico: novo });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao salvar histórico.' });
    }
});

// --- ROTAS ANTIGAS (mantidas para compatibilidade) ---
app.get('/api/drivers', async (req, res) => {
    const motoristas = await Motorista.find();
    res.status(200).json(motoristas.map(m => ({
        _id: m._id, name: m.nome, phone: m.telefone,
        car: m.carro, seats: m.vagas, route: m.rotas, comments: m.observacoes
    })));
});
app.post('/api/drivers', (req, res) => res.redirect(307, '/api/motoristas'));
app.put('/api/drivers/:id', (req, res) => res.redirect(307, `/api/motoristas/${req.params.id}`));
app.delete('/api/drivers/:id', (req, res) => res.redirect(307, `/api/motoristas/${req.params.id}`));

app.get('/api/riders', async (req, res) => {
    const passageiras = await Passageira.find();
    res.status(200).json(passageiras.map(p => ({
        _id: p._id, name: p.nome, phone: p.telefone,
        origin: p.origem, destination: p.destino, preferences: p.preferencias
    })));
});
app.post('/api/riders', (req, res) => res.redirect(307, '/api/passageiras'));
app.put('/api/riders/:id', (req, res) => res.redirect(307, `/api/passageiras/${req.params.id}`));
app.delete('/api/riders/:id', (req, res) => res.redirect(307, `/api/passageiras/${req.params.id}`));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});