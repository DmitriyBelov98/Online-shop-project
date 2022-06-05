const exprees = require('express');
const authRoutes = require('./routes/auth.routes');

const app = exprees();



app.use(authRoutes);

app.listen(3000);