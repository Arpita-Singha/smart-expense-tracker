import Income from "../models/Income.js";

// Add Income
export const addIncome = async (req, res) => {
  try {
    const {
      amount,
      source,
      category,
      notes,
      paymentMethod,
      date,
    } = req.body;

    if (!amount || !source || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount, Source and Category are required",
      });
    }

    const income = await Income.create({
      user: req.user.id,
      amount,
      source,
      category,
      notes,
      paymentMethod,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Income
export const getIncome = async (req, res) => {
  try {
    const income = await Income.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: income.length,
      income,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Income
export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income: updatedIncome,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    await income.deleteOne();

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};