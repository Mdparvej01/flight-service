const express = require('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const app = express();

 app.use('/api' , apiRoutes);
 
app.listen(ServerConfig.PORT , ()=> {
    console.log(`Sucessfully started the server on PORT:${ServerConfig.PORT}`);
    // Logger.info("Sucessfully started the server" , "root" , {}) // bcz root index .js simply use Logger .error  
});
