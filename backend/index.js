const express = require('express');
const cors = require('cors');

const GeneratorRoutes = require('./routes/GeneratorRoutes');

const app = express();

//config JSON response
app.use(express.json());

//solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

//routes
app.use('/', GeneratorRoutes);

app.listen(5001);