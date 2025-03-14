const User = require('../models/User');

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Comparação de senha em texto plano (INSEGURO!)
    if (senha === user.senha) {
      res.json({ message: 'Login realizado com sucesso', user: { nome: user.nome, email: user.email } });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Corpo da requisição vazio' });
    }

    const { nome, email, senha } = req.body;

    console.log('Criando usuário com:', { nome, email, senha });

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    // Armazenando senha em texto plano (INSEGURO!)
    const user = new User({ nome, email, senha });
    await user.save();

    return res.status(201).json({ message: ' Usuário criado com sucesso', user: { nome: user.nome, email: user.email } });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

module.exports = { createUser, loginUser };