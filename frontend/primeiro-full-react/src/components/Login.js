import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

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

      if (resposta.status === 200 && resposta.data.token) {
        localStorage.setItem('token', resposta.data.token);
        navigate('/pagina-principal'); // Use navigate para redirecionar
      } else {
        setMensagemErro(resposta.data.message || 'Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      if (error.response) {
        setMensagemErro(error.response.data.message || 'Erro ao fazer login. Tente novamente.');
      } else {
        setMensagemErro('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:8000/api/spotify/authorize';
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          {mensagemErro && <Alert variant="danger">{mensagemErro}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autocomplete="current-password" // Adicione o atributo autocomplete
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button variant="success" onClick={handleSpotifyLogin}>
                Login com Spotify
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <p>
              Não tem uma conta? <Link to="/cadastro">Criar conta</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;