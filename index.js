const express = require('express');
const app = express();
const pool = require('./db_connection');


app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/usuario', (req, res) => {
  const usuario = {
    id: 1,
    nombre: 'Juan',
    rol: 'Administrador'
  };

  res.json(usuario);
});

pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error de conexión', err);
  });


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});


