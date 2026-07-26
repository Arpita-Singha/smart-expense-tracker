import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    monthlyBudget: {
      type: Number,
      default: 0,
    },
    savingsGoalName: {
      type: String,
      default: "My Goal",
    },
    targetAmount: {
      type: Number,
      default: 0,
    },
    savedAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);