const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const habits = require("./habits.js");
const Habit = habits.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  habit: {
    type: mongoose.Schema.ObjectId,
    ref: 'Habit',
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

router.post("/:id", validUser, async (req, res) => {
  // check parameters
  if (req.body.comment === "") {
    return res.status(400).send({
      message: "No comment submitted"
    });
  }
  try {
    let habit = await Habit.findOne({
      _id: req.params.id,
    });
    if (!habit) {
      return res.sendStatus(404);
    }
    let comment = new Comment({
      comment: req.body.comment,
      user: req.user,
      habit: habit._id,
    });
    await comment.save();
    return res.send(comment);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  // return comment
  try {
    let habit = await Habit.findOne({
      _id: req.params.id
    });
    if (!habit) {
      return res.sendStatus(404);
    }
    let comments = await Comment.find({
      habit: habit._id,
    }).sort({
      created: -1
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}