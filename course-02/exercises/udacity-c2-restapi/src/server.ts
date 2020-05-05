import express from 'express';
import { sequelize } from './sequelize'; // importing sequelize from our root of our source folder "./sequelize"

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';

import { V0MODELS } from './controllers/v0/model.index';

(async () => { // fires up the database while starting server and syncing it with postgress
  await sequelize.addModels(V0MODELS); // Classes that will be transferred to tables in postgress = models; and the await tag makes the code waiting to complete as it's within an async function
  await sequelize.sync(); // will allow that the database is insync with the expected models within sequelize (makes sure tables are in sync with the corresponding objects). It does it by applying the migrations

  const app = express();
  const port = process.env.PORT || 8080; // default port to listen
  
  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();