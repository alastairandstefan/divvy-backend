const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const expenseSchema = new Schema(
  {
    expenseName: {
      type: String,
      required: [true, "Expense name is required."],
    },
    description: String,
    amount: {
      type: Number,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    payer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    splits: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        amount: {
            type: Number
        }
    }],
    date: { type: Date, default: Date.now }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
