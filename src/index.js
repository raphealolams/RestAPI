// import default files
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// import custom files
import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(bodyParser.json({
  limit:config.bodyLimit
}));


// passport


// api routes
app.use('./v1' , routes);

// listen to port
app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);


export default app;