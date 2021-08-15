const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  name : {
    type : String,
    requierd : true,
    unique : true,
  },
  age : {
    type : Number,
    required : true,
  },
  marreid : {
    type : Boolean,
    require : true
  },
  comment : String,
  createdAt : {
    type : Date,
    default : Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);