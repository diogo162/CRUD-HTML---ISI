const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

