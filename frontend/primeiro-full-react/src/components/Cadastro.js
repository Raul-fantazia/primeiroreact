import React, { useState } from 'react';
import axios from 'axios';

function CriarUsuario() {
    // dados do usuario
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState ('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const resposta = await axios.post('/api/users' , { nome, email, senha});
            setMensagem(resposta.data.message);
        } catch (error) {
            setMensagem(error.resposta.data.message);
        }
    };

    return (
        <div>
            <h2>Criar usuário</h2>
            {mensagem && <p> {mensagem}</p>}
            <form onSubmit={handleSubmit}>
                <input type = "text" placeholder='Nome' value= {nome} onChange={(e) => setNome (e.target.value)}/>
                <input type="email" placeholder='Email' value= {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password"  placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}


export default CriarUsuario;