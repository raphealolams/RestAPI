import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import foodtruck from '../controller/foodtruck';
import account from '../controller/account';



let router = express();


//connect to db
initializeDb(db => {
  // Internal middleware
  router.use(middleware({config , db}));


  // api routes v1 (v1);
  router.use('/foodtrucks', foodtruck({config , db}));
  router.use('/accounts', account({config , db}));
  
});

export default router;