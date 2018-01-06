import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passwordLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
  email: String,
  password: String
});
Account.plugin(passwordLocalMongoose);
module.exports = mongoose.model('Account' , Account);