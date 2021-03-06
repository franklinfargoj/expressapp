var mongoose = require('mongoose');
var passport = require("passport");
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

//Schema for users collection
var UserSchema = new mongoose.Schema({
    email : {type:String,unique: true,require:true},
    username: {type:String, require:true},
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true}
  },{ versionKey: '' }, { collection: 'users' });

  UserSchema.plugin(uniqueValidator);

  UserSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
  }

  //check if password matches in the database while login
  UserSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
  }

module.exports = mongoose.model('User',UserSchema);