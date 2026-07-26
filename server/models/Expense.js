import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Grocery",
        "Shopping",
        "EMI",
        "Electricity",
        "Gas",
        "Water",
        "Internet",
        "Mobile Recharge",
        "Fuel",
        "Travel",
        "Entertainment",
        "Education",
        "Medical",
        "Rent",
        "Insurance",
        "Investment",
        "Miscellaneous",
      ],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      default: "Cash",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    receipt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;