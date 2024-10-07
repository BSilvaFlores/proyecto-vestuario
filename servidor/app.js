const express = require('express');
const morgan = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

//conexión a base de datos
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/vestuarioDB';

mongoose.connect( url ).then(
    () => {
	console.log('Conectado a mongo')
      },
      err => { err }
);

//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.send('Hola mundo')
});

//middleware para vue.js
app.use('/api', require('./routes/vestuariosDB'))
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


//el puerto 3000 es predeterminado
app.set('puerto', process.env.PORT || 3000)
app.listen(app.get('puerto') , function () {
    console.log('Escuchando el puerto ' + app.get('puerto'))
});