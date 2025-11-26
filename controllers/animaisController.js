/* Obtem uma "conexão" Knex já vinculado ao banco, que por sua vez é configurado através do knexfile, que carrega os valores definidos
no arquivo .env para process.env, de onde 

acessa as variáves armazenadas
em process.env.*

Neste local os valores arquivo .env são carregados

*/

const db = require('../db/knex');

// Método de Consulta através do ID

exports.obter = async (req, res) => {
  try {
    const animal = await db("animais").where({ id: req.params.id }).first();
    if (!animal) {
      return res.status(404).json({ erro: "Animal não encontrado" });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar animal" });
  }
};

// Método de Listar todos os animais 

exports.listar = async (req, res) => {
  try {
    const animais = await db('animais').orderBy('nome_animal');
    res.json(animais);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar animais' });
  }
};


// Método de inserir um animal 

exports.inserir = async (req, res) => {
  try {
    const { codigo_lacre, nome_animal, codigo_registro, codigo_registro_pai, codigo_registro_mae, peso_inicial, data_nascimento } = req.body;
    await db('animais').insert({ codigo_lacre:codigo_lacre, nome_animal:nome_animal, codigo_registro:codigo_registro, codigo_registro_pai:codigo_registro_pai, codigo_registro_mae:codigo_registro_mae, peso_inicial:peso_inicial, data_nascimento:data_nascimento });
    res.status(201).json({ mensagem: 'Animal inserido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao inserir animal' });
  }
};

// Método de atualizar um animal 


exports.atualizar = async (req, res) => {
  try {
    console.log('Corpo da Requisição',req.body);
    const { id } = req.params;
    const { codigo_lacre, nome_animal, codigo_registro, codigo_registro_pai, codigo_registro_mae, peso_inicial, data_nascimento } = req.body;
    await db('animais').where({ id }).update({ codigo_lacre:codigo_lacre, nome_animal:nome_animal, codigo_registro:codigo_registro, codigo_registro_pai:codigo_registro_pai, codigo_registro_mae:codigo_registro_mae, peso_inicial:peso_inicial, data_nascimento:data_nascimento });
    res.json({ mensagem: 'Animal atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar animal' });
  }
};

// Método de excluir um animal 

exports.excluir = async (req, res) => {
  try {
    const { id } = req.params;
    await db('animais').where({ id }).del();
    res.json({ mensagem: 'Animal excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir animal' });
  }
};
