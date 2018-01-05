import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';


export default({config , db}) => {
  let api = Router();

  // 'v1/foodTrucks/add' --- Create
  api.post('/add' , (req , res) => {
    let newFoodTruck = new FoodTruck();
    newFoodTruck.name = req.body.name;

    newFoodTruck.save(err => {
      if(err){
        res.send(err);
      }
      res.json({message: 'FoodTruck save Successfully...'});
    });
  });

  // 'v1/foodTrucks'  --- Read
  api.get('/' , (req , res) => {
    FoodTruck.find({} , (err , foodTrucks) => {
      if(err){
        res.send(err);
      }
      res.json(foodTrucks);
    });
  });

  // 'v1/foodTrucks/:id'  --- Read 1
  api.get('/:id' , (req , res) => {
    FoodTruck.findById(req.params.id , (err , foodTruck) => {
      if(err){
        res.send(err);
      }
      res.json(foodTruck);
    });
  });

  // 'v1/foodTrucks/:id'  --- Update 1
  api.put('/:id' , (req , res) => {
    FoodTruck.findById(req.params.id , (err , foodTruck) => {
      if(err){
        res.send(err);
      }
      foodTruck.name = req.body.name;
      foodTruck.save(err => {
        if(err){
          res.send(err);
        }
        res.json({message: "FoodTruck Info Updated"});
      });
    });
  });

  // 'v1/foodTrucks/:id' --- delete
  api.delete('/:id' , (req , res) => {
    FoodTruck.remove({
      _id: req.params.id
    }, (err , foodTruck) => {
      if(err){
        res.send(err);
      }
      res.json({message: "FoodTruck successfully Remove!..."});
    });
  });

  // add review for a specific foodTruck Id
  // v1/foodTrucks/reviews/add/:id
  api.post('/reviews/add/:id' , (req , res) => {
    FoodTruck.findById(req.params.id , (err , foodtruck) => {
      if(err){
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
    })
  })


  return api;
}
