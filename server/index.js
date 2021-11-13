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

let port = process.env.PORT || '5000';
app.set('port', port);
let host = process.env.DOMAIN_NAME || 'localhost';

server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});
  
 