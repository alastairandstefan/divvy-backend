const express = require("express");
const router = express.Router();
const Group = require("../models/Group.model")
const mongoose = require('mongoose');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// GET /api/groups/user/ - Get all groups of user
router.get("/user", isAuthenticated, (req, res, next) => {
  // get User Id from the middleware
  const userId = req.payload._id;
   
  Group.find({members: userId})
    .populate("members", ["name", "email"])
    .then(groups => {
      res.status(200).json(groups)
    })
    .catch(err => {
      next(err)
    })
});


// GET /api/groups/:groupId - Get group by ID

router.get("/:groupId", isAuthenticated, (req, res, next) => {
  const  { groupId }  = req.params
  const userId = req.payload._id;
  
  Group.findOne({$and: [{_id: groupId}, {members: userId}]})
    .populate("members", ["name", "email"])
    .then(groups => {
      res.status(200).json(groups)
    })
    .catch(err => {
      next(err)
    })
});

// PUT /api/groups/:groupId - Update group

router.put("/:groupId", isAuthenticated, (req, res, next) => {
  const { groupId }  = req.params;
  const userId = req.payload._id;
  
  const { groupName, members } = req.body;

  const updatedGroup = { groupName, members }

  Group.findOneAndUpdate({$and: [{_id: groupId}, {members: userId}]}, updatedGroup, {new: true})
    .populate("members", ["name", "email"])
    .then(updatedGroup => {
      res.status(200).json(updatedGroup)
    })
    .catch(err => {
      next(err)
    })
});


// POST /api/groups - Create new group
router.post('/', isAuthenticated, (req, res, next) => {

  const {groupName, members} = req.body;

  Group.create({groupName, members})
    .then(newGroup => {
      res.status(201).json(newGroup);
    })
    .catch(err => {
      next(err);
    })

})

// DELETE /api/groups/:groupId - Delete group

router.delete("/:groupId", isAuthenticated, (req, res, next) => {
  const { groupId }  = req.params;
  const userId = req.payload._id;

  Group.findOneAndDelete({$and: [{_id: groupId}, {members: userId}]})
    .then(deletedGroup => {
      res.status(200).json(deletedGroup)
    })
    .catch(err => {
      next(err)
    })
});

module.exports = router;