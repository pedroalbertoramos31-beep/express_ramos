const express = require('express');
const app = express();
const pool = require('./db_connection');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/alumnos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

app.get('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM alumno WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});


app.post('/alumnos', async (req, res) => {
  try {
    const { nombre, apellido, edad, correo } = req.body;

    if (!nombre || !apellido || !edad || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const resultado = await pool.query(
      'INSERT INTO alumno (nombre, apellido, edad, correo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, correo]
    );

    res.status(201).json({
      mensaje: 'Alumno insertado correctamente',
      alumno: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al insertar alumno:', error);
    res.status(500).json({ error: 'Error al insertar el alumno' });
  }
});


app.get('/materia', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materia');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener materias' });
  }
});

app.post('/materia', async (req, res) => {
  try {
    const { nombre, semestre, creditos } = req.body;

    if (!nombre || !semestre || !creditos) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const result = await pool.query(
      'INSERT INTO materia (nombre, semestre, creditos) VALUES ($1, $2, $3) RETURNING *',
      [nombre, semestre, creditos]
    );

    res.status(201).json({
      mensaje: 'Materia creada',
      materia: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar materia' });
  }
});

app.get('/materia/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM materia WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar materia:', error);
    res.status(500).json({ error: 'Error al obtener la materia' });
  }
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


