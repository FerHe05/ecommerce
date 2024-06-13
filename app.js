const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./connection/connection_db');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rotas
const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
