const express = require("express");
const router = express.Router();

const Question = require('./Question');

// @desc    Fetch all questions
// @route   GET /api/questions
// @access  Public
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching questions' });
  }
};

module.exports = router;