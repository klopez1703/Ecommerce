const express = require('express');
const session=require('express-session')
const path=require('path')
const morgan = require('morgan');
const { patch } = require('./routes/usuarios');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    cookie:{
        maxAge:1000*60*60*24*365,
        httpOnly:true,
        secure:process.env.NODE_ENV,
    },
    saveUninitialized:false,
    secret:'hjgdfy78e80rteq089fdiusyf_IO)PJ)',
    resave:false,
    name:'secionID'
}))
//Settings
app.set('port', process.env.PORT || 4002);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))


//Routes
//app.use('/', require('./rutas/productos'));
app.use('/', require('./routes/index'));
app.use('/usuarios/', require('./routes/usuarios'));
app.use('/api/orden/', require('./routes/orden'));
app.use('/productos/', require('./routes/productos'));
app.use('/carrito/', require('./routes/carrito'));
app.use('/api/detalleorden/', require('./routes/detalleorden'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static('imagenes'))//carpeta accesible a la pagina web


//Starting the Server
app.listen(app.get('port'), ()=>{
    console.log("Servidor iniciado en el puerto ", app.get('port'));
});