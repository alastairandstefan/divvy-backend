const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense.model")
const mongoose = require('mongoose');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


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

// GET /api/expenses/user/- Get expenses of user

router.get("/user", isAuthenticated, (req, res, next) => {

  const userId = req.payload._id;
  
  Expense.find({"$or": [{"splits.userId": userId}, {"payer": userId}]})
    .populate("splits.userId", "name")
    .populate("payer", "name")
    .then(expenses => {
      res.status(200).json(expenses)
    })
    .catch(err => {
      next(err)
    })
});


// GET /api/expenses/:expenseId - Get expense by ID

router.get("/:expenseId", isAuthenticated, (req, res, next) => {
  const  { expenseId }  = req.params
  const userId = req.payload._id;
  
  Expense.findOne({"$and": [{"_id": expenseId}, {"$or": [{"splits.userId": userId}, {"payer": userId}]}]})
    .populate("splits.userId", "name")
    .populate("payer", "name")
    .then(expense => {
      res.status(200).json(expense)
    })
    .catch(err => {
      next(err)
    })
});

// GET /api/expenses/group/:groupId - Get expenses by groupId

router.get("/group/:groupId", isAuthenticated, (req, res, next) => {
  const  { groupId }  = req.params
  const userId = req.payload._id;
  
  Expense.find({"$and": [{"group": groupId}, {"$or": [{"splits.userId": userId}, {"payer": userId}]}]})
    .populate("splits.userId", "name")
    .populate("payer", "name")
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
    .populate("payer", "name")
    .then(updatedExpense => {
      res.status(200).json(updatedExpense)
    })
    .catch(err => {
      next(err)
    })
});

// DELETE /api/expenses/:expenseId - Delete expense

router.delete("/:expenseId", isAuthenticated, (req, res, next) => {
  const { expenseId }  = req.params;
  const userId = req.payload._id;

  Expense.findOneAndDelete({"$and": [{"_id": expenseId}, {"$or": [{"splits.userId": userId}, {"payer": userId}]}]})
    .then(deletedExpense => {
      res.status(200).json(deletedExpense)
    })
    .catch(err => {
      next(err)
    })
});




module.exports = router;