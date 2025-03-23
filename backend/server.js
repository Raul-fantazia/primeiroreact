require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const spotifyRoutes = require('./routes/spotify'); 
const spotifyController = require('./controllers/SpotifyController'); 

const app = express();
const port = 8000;
 
// middlewares
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/spotify', spotifyRoutes);


app.get('/authorize', spotifyController.authorize);
app.get('/callback', spotifyController.callback);
app.get('/current-track', spotifyController.findCurrentTrack);
app.put('/play-track', spotifyController.playTrack);


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