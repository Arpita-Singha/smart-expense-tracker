import Budget from "../models/Budget.js";

export const getBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne({ user: req.user.id });

    if (!budget) {
      budget = await Budget.create({
        user: req.user.id,
      });
    }

    res.json({
      success: true,
      budget,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const {
      monthlyBudget,
      savingsGoalName,
      targetAmount,
      savedAmount,
    } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { user: req.user.id },
      {
        monthlyBudget,
        savingsGoalName,
        targetAmount,
        savedAmount,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      budget,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};