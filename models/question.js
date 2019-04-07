const mongoose = require('mongoose');
const {Schema} = mongoose;

const questionSchema=new Schema({
  index:{
    type:Number,
    default:1
  },
  question:{
    type:String,
    default:""
  },
  option1:{
    type:String,
    default:""
  },
  option2:{
    type:String,
    default:""
  },
  option3:{
    type:String,
    default:""
  },
  option4:{
    type:String,
    default:""
  },
  answer:{
    type:String
  },
  explaination:{
    type:String,
    default:""
  }
})

module.exports = Question = mongoose.model('questions',questionSchema);
