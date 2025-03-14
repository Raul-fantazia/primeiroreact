require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 8000;

app.use(express.json());

app.use('/api', userRoutes);




// Conectando ao banco de dados
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// testando
app.get('/', (req, res) => {
  res.send(' Servidor funcionando perfeitamente!');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(` Servidor rodando na porta ${port}`);
});
