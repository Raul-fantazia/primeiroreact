import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function PaginaPrincipal() {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackUri, setTrackUri] = useState('');

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await axios.get('http://localhost:3001/current-track', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCurrentTrack(response.data);
      } catch (error) {
        console.error('Erro ao obter faixa atual:', error);
      }
    };

    if (accessToken) {
      fetchCurrentTrack();
    }
  }, [accessToken]);

  const handlePlayTrack = async () => {
    try {
      await axios.put(
        'http://localhost:3001/play-track',
        { trackUri: trackUri },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Reprodução iniciada');
    } catch (error) {
      console.error('Erro ao iniciar reprodução:', error);
    }
  };

  return (
    <div>
      <h1>Bem-vindo à Página Principal!</h1>
      {accessToken && (
        <div>
          <p>Token de Acesso: {accessToken}</p>
          {currentTrack && currentTrack.artists && currentTrack.artists.length > 0 && (
            <div>
              <p>Tocando agora: {currentTrack.name} - {currentTrack.artists[0].name}</p>
            </div>
          )}
          <input
            type="text"
            value={trackUri}
            onChange={(e) => setTrackUri(e.target.value)}
            placeholder="URI da música"
          />
          <button onClick={handlePlayTrack}>Reproduzir Música</button>
        </div>
      )}
    </div>
  );
}

export default PaginaPrincipal;