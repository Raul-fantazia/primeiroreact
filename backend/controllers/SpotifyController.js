const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

exports.authorize = (req, res) => {
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';
  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({ 
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  })}`;
  res.redirect(authUrl);
};

exports.callback = async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token', // URL correta
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Armazenando  os tokens no banco de dados associados ao usuário

    res.redirect(`http://localhost:3000/pagina-principal?access_token=${accessToken}`);
  } catch (error) {
    console.error('Erro ao obter tokens:', error);
    console.error('Erro detalhado:', error.response ? error.response.data : error.message);
    res.status(500).send('Erro ao obter tokens');
  }
};