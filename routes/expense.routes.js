const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense.model")
const mongoose = require('mongoose');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { default: GroupDetailsPage } = require("../../divvy-frontend/src/pages/GroupDetailsPage.jsx");


// POST /api/expenses - Create new expense
router.post('/', isAuthenticated, (req, res, next) => {

  const {expenseName, description, group, amount, payer, splits} = req.body;

  Expense.create({expenseName, description, group, amount, payer, splits})
    .then(newExpense => {
      res.status(201).json(newExpense);
    })
    .catch(err => {
      next(err);
    })

})


// GET /api/expenses/:expenseId - Get expense by ID

router.get("/:expenseId", isAuthenticated, (req, res, next) => {
  const  { expenseId }  = req.params
  const userId = req.payload._id;
  
  Expense.findOne({"$and": [{"_id": expenseId}, {"$or": [{"splits.userId": userId}, {"payer": userId}]}]})
    .populate("splits.userId", "name")
    .then(expense => {
      res.status(200).json(expense)
    })
    .catch(err => {
      next(err)
    })
});

// GET /api/expenses/group/:groupId - Get expense by groupId

router.get("/group/:groupId", isAuthenticated, (req, res, next) => {
  const  { groupId }  = req.params
  const userId = req.payload._id;
  
  Expense.findOne({"$and": [{"group": GroupDetailsPage}, {"$or": [{"splits.userId": userId}, {"payer": userId}]}]})
    .populate("splits.userId", "name")
    .then(expenses => {
      res.status(200).json(expenses)
    })
    .catch(err => {
      next(err)
    })
});

// PUT /api/expenses/:expenseId - Update expense

router.put("/:expenseId", isAuthenticated, (req, res, next) => {
  const { expenseId }  = req.params;
  const userId = req.payload._id;
  
  const { expenseName, description, group, amount, payer, splits } = req.body;

  const updatedExpense = { expenseName, description, group, amount, payer, splits }

  Expense.findOneAndUpdate({"$and": [{"_id": expenseId}, {"$or": [{"splits.userId": userId}, {"payer": userId}]}]}, updatedExpense, {new: true})
    .populate("splits.userId", "name")
    .then(updatedExpense => {
      res.status(200).json(updatedExpense)
    })
    .catch(err => {
      next(err)
    })
});




module.exports = router;