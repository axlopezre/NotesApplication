const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(
  cors({
    origin: 'http://localhost:4000'
  })
);

// Config Auth sso
app.use(require('./config/auth.routes'));

// Config Routes
app.use(require('./config/routes'));

// Start the server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

//Main path served by React application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Management of any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// SEQUELIZE-----
const sequelize = require('./sequelize');
const Estacionamiento = require('./models/Note');

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database established correctly.');

    // Synchronize the model with the database
    await Estacionamiento.sync();
    console.log('Model Parking synchronized correctly.');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

startApp();
