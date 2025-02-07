const express = require('express');
const sequelize = require('./config/database');

const usuarioR = require('./routes/usuarioRoutes');
const propietarioR = require('./routes/propietarioRoutes');
const visitanteR = require('./routes/visitanteRoutes');
const pagoR = require('./routes/pagoRoutes');
const apartamentoR = require('./routes/apartamentoRoutes');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/usuario', usuarioR);
app.use('/api/propietario', propietarioR);
app.use('/api/visitante', visitanteR);
app.use('/api/pago', pagoR);
app.use('/api/apartamento', apartamentoR);

app.get('/', (req, res) => {
  res.send('¡API Villa del Sol funcionando correctamente!');
});


sequelize
  .authenticate()
  .then(async () => {
    console.log('Conexión a MySQL exitosa');
  
    await sequelize.sync();
    console.log('Tablas sincronizadas correctamente');
  })
  .catch((error) => {
    console.error('Error al conectar a MySQL:', error);
  });


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
