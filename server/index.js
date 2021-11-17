//Imports
let userRouter = require('./routes/user');
let adminRouter = require('./routes/admin');

//Environment variables
require('dotenv').config();

//Connecting database
require('./db/mongoDB');

//Creating an express instance
let express  = require('express');
let app = express();
const http = require('http');

//Creating http server
let server = http.createServer(app);

app.use(express.json());

//Routes
app.use('/user', userRouter );
app.use('/admin' , adminRouter );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    next();
});

//CORS policy
const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

let port = process.env.PORT || '5000';
app.set('port', port);
let host = process.env.DOMAIN_NAME || 'localhost';

server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});
  
 