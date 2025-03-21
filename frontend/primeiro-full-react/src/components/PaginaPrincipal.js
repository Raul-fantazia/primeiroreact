import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PaginaPrincipal() {
    const [ searchParams ] = useSearchParams();
    const acessToken = searchParams.get('acess_token');
    const [currentTrack, setCurrentTrack ] = useState(null);

    useEffect(() => {
        if (acessToken) {
            
            fetchCurrentTrack(acessToken)
        }
    }, [acessToken]);
    
    
    //mostra informações da musica que esta tocando

    const fetchCurrentTrack = async (token) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player', {
                Headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentTrack(response.data.item);
        } catch (error) {
            console.error('Erro ao obter faixa atual' , error);
        }
    };

    
    return (
        <div>
          <h1>Bem-vindo à Página Principal!</h1>
          {accessToken && (
            <div>
              <p>Token de Acesso: {accessToken}</p>
              {currentTrack && (
                <div>
                  <p>Tocando agora: {currentTrack.name} - {currentTrack.artists[0].name}</p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    

export default PaginaPrincipal;