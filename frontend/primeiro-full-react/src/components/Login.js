import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagemErro('');

    try {
      const resposta = await axios.post('/api/login', { email, senha });
      console.log(resposta.data);

      // Lógica para lidar com a resposta da API
      if (resposta.data.token) {
        // Armazene o token no localStorage ou em um cookie
        localStorage.setItem('token', resposta.data.token);

        // Redirecione o usuário para a página principal
        window.location.href = '/pagina-principal'; // Substitua pela sua rota
      } else {
        setMensagemErro('Login realizado com sucesso, mas token não recebido.');
      }
    } catch (error) {
      if (error.response) {
        setMensagemErro(error.response.data.message);
      } else {
        setMensagemErro('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Login</button>
       
      </form>

      <p>
        Não tem uma conta? <Link to="/cadastro">Criar conta</Link> {}
      </p>
      </div>
      
  );
}

export default Login;