import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';
import password from 'password';
import config from '../config';

import { generateAccessToken , respond , authenticate } from '../middleware/authMiddleware';


export default ({ config , db}) => {
  let api = Router();

  // 'v1/accounts/register'

  api.post('/register' , (req , res) => {
    Account.register(new Account({username: req.body.email}) , req.body.password , function(err , account){
      if(err){
        res.send(err);
      }
      passport.authenticate(
        'local' , {
          session: false,
        })(req , res , () => {
          res.status(200).send('Successfully created new Account');
        });
    });
  });

  // 'v1/accounts/login'
  api.post('/login' , passport.authenticate(
    'local' , {
      session: false,
      scope: []
    }) , generateAccessToken , respond
  );

  // 'vi/accounts/logout'
  api.get('/logout' , authenticate , (req ,res) => {
    res.logout();
    res.status(200).send('Successfully Logged Out');
  });

  // 'vi/accounts/me'
  api.get('/me' , authenticate , (req , res) => {
    res.status(200).json(req.user);
  });

  return api;
}