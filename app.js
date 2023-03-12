const express = require('express');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'STIIM',
password: '1597536d',
port: 5432,
});

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
console.log('Servidor rodando na porta ${port}');
});

// Criar um produto
app.post('/produtos', async (req, res) => {
const { tipo, modelo, preco, quantidade, imagem } = req.body;

const newProduct = await pool.query(
'INSERT INTO produtos (tipo, modelo, preco, quantidade, imagem) VALUES ($1, $2, $3, $4, $5) RETURNING *',
[tipo, modelo, preco, quantidade, imagem]
);

res.status(201).json(newProduct.rows[0]);
});

// Listar todos os produtos
app.get('/produtos', async (req, res) => {
const products = await pool.query('SELECT * FROM produtos');

res.status(200).json(products.rows);
});

// Ler um produto pelo id
app.get('/produtos/:id', async (req, res) => {
const { id } = req.params;

const product = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);

if (product.rows.length === 0) {
res.status(404).json({ error: 'Produto não encontrado' });
} else {
res.status(200).json(product.rows[0]);
}
});

// Atualizar um produto pelo id
app.put('/produtos/:id', async (req, res) => {
const { id } = req.params;
const { tipo, modelo, preco, quantidade, imagem } = req.body;

const updatedProduct = await pool.query(
'UPDATE produtos SET tipo = $1, modelo = $2, preco = $3, quantidade = $4, imagem = $5 WHERE id = $6 RETURNING *',
[tipo, modelo, preco, quantidade, imagem, id]
);

if (updatedProduct.rows.length === 0) {
res.status(404).json({ error: 'Produto não encontrado' });
} else {
res.status(200).json(updatedProduct.rows[0]);
}
});

// Excluir um produto pelo id
app.delete('/produtos/:id', async (req, res) => {
const { id } = req.params;

const deletedProduct = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);

if (deletedProduct.rows.length === 0) {
res.status(404).json({ error: 'Produto não encontrado' });
} else {
res.status(204).send();
}
});

app.get('/', function (req, res) {
res.sendFile(__dirname + '/public/index.html');
});