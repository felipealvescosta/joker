const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const routes = require('./routes');

sequelize.sync().then(() => console.log('database connected successfully 🏦'));

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3300, () => {
  console.log('Server started on port 3300 🔥');
});
