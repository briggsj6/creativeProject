const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  habit: String,
  description: String,
  share: Boolean,
  streak: {
    type: Number,
    default: 0,
  },
  performed: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now
  },
});

const Habit = mongoose.model('Habit', habitSchema);

// add a habit
router.post("/", validUser, async (req, res) => {


  if (req.body.habit === "")
    return res.status(400).send({
      message: "Habit cannot be empty"
    });

  const habit = new Habit({
    user: req.user,
    habit: req.body.habit,
    description: req.body.description,
    share: req.body.share,
  });
  try {
    await habit.save();
    return res.send(habit);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/perf/:id", validUser, async (req, res) => {
  try {
    let habit = await Habit.findOne({
      _id: req.params.id
    });
    if (!habit) {
      res.send(404);
      return;
    }
    habit.performed = req.body.performed + 1
    await habit.save();
    res.send(habit);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/edit/:id", validUser, async (req, res) => {
  console.log("You edited a habit");
  try {
    let habit = await Habit.findOne({
      _id: req.params.id
    });
    if (!habit) {
      res.send(404);
      return;
    }
    habit.description = req.body.description;
    await habit.save();
    res.send(habit);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/perf/:id", validUser, async (req, res) => {
  try {
    let habit = await Habit.findOne({
      _id: req.params.id
    });
    if (!habit) {
      res.send(404);
      return;
    }
    await habit.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// get users habits
router.get("/", validUser, async (req, res) => {

  try {
    let habits = await Habit.find({
      user: req.user
    }).sort({
      created: +1
    }).populate('user');
    return res.send(habits);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get shared habits
router.get("/shared", async (req, res) => {
  try {
    let habits = await Habit.find({
      share: true
    }).sort({
      created: -1
    }).populate('user');
    return res.send(habits);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Habit,
  routes: router,
}