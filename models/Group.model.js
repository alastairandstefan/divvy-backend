const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: [true, "Group name is required."],
    },
    members: {
    type: [ Schema.Types.ObjectId ],
      ref: 'User'
    },
    colorCode: String
  }
);

const Group = model("Group", groupSchema);

module.exports = Group;
