import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import './Login.css';

function CriarUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const resposta = await axios.post('/api/users', { nome, email, senha });
            setMensagem(resposta.data.message);
        } catch (error) {
            setMensagem(error.response.data.message);
        }
    };

    return (
        <Container className="container d-flex justify-content-center align-items-center vh-100">
            <Row className="row w-100">
                <Col md={6} className="col-md-6 mx-auto">
                    <div className="text-center mb-4">
                        <h2>Criar usuário</h2>
                    </div>
                    {mensagem && <Alert variant="danger">{mensagem}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Criar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CriarUsuario;