import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Salary",
        "Freelancing",
        "Business",
        "Investment",
        "Bonus",
        "Rental Income",
        "Gifts",
        "Others",
      ],
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      default: "UPI",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Income", incomeSchema);