const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();

sequelize.sync().then(() => console.log('database connected successfully 🏦'));

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000 🔥');
});
