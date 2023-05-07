const express  = require('express');
const {PORT}   = require('./config/serverConfig');
const bodyParser = require('body-parser');
const app = express();

const ApiRouter  = require('./router/index.js')

const setUpAndStartServer  = () =>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', ApiRouter)


    app.listen(PORT, ()=>{
        console.log(`Server started on PORT ${PORT}`)
    })
}

setUpAndStartServer();

