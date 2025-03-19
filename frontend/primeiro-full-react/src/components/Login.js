import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
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
                    <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Login
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