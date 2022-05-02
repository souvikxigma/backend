let express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');
var fs = require("fs");
//for string concatenation use path module
let path = require('path');
//create an instance of express server
let app = express();
/* CORS */
app.use(cors())


//let bodyParser to accept URL encoded Data
app.use(bodyParser.urlencoded({extended:true}));
//let bodyParser to accept and parse JSON Data
app.use(bodyParser.json());


let api = require('./routes/api');
//loading api.js
app.use('/api',api);
require('dotenv').config({path:'.env'});




//// server part /////
const https = require('https')
const options = {
  key: fs.readFileSync('/etc/apache2/ssl/99online_website.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/99online_website.crt')
};
const server = https.createServer(options, app);

//// server part /////
    
//listening the server at port
// app.listen(port,()=>{
//     console.log(`express server has started at ${port}`);
// });
// app.listen(process.env.PORT,()=>{
//     console.log(`express server has started at ${process.env.PORT}`);
// });

server.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))