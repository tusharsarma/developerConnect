const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const isEmpty = require('../../validation/is-empty');
const Question = require('../../models/question');
const User = require('../../models/User');
const passport = require('passport');
router.get('/:index',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Question.findOne({index:req.params.index}).then(question=>{
    if(isEmpty(question)){
      return res.json({err:"-1"});
    }
    User.findOneAndUpdate({ "email" : req.user.email },{ $inc: { "qindex" : 1 } }).then(user=>{});
    res.json(question);
  })
});
router.post('/add',(req,res)=>{
  let index=1;
  Question.findOne().sort({$natural:-1}).then(question2=>{
    console.log(question2);
    console.log(isEmpty(question2));
    if(!isEmpty(question2)){index=question2.index+1;}
    const question1 = new Question({
      index:index,
      question:req.body.question,
      option1:req.body.option1,
      option2:req.body.option2,
      option3:req.body.option3,
      option4:req.body.option4,
      answer:req.body.answer,
      explaination:req.body.explaination,
    });
    question1.save().then(question=>{
      console.log(question);
      res.json(question);
    });
  });
});

module.exports = router;
