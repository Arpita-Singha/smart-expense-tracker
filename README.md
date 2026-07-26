# 💰 Smart Expense Tracker

A modern full-stack MERN Expense Tracker that helps users manage their income, expenses, budgets, savings goals, and financial reports through an intuitive dashboard with interactive analytics.

---

## 📌 Features

### 🔐 Authentication

- User Registration
- Secure Login using JWT Authentication
- Protected Routes
- Logout

### 📊 Dashboard

- Financial Summary Cards
- Total Income
- Total Expenses
- Current Balance
- Savings Overview
- Recent Expenses
- Interactive Charts

### 💸 Expense Management

- Add Expenses
- View Expenses
- Delete Expenses
- Category-wise Expense Tracking

### 💰 Income Management

- Add Income
- View Income
- Delete Income

### 🎯 Budget Management

- Monthly Budget
- Savings Goal
- Budget Progress Bar
- Remaining Budget Calculation

### 📈 Analytics

- Income vs Expense Bar Chart
- Expense Category Pie Chart
- Financial Overview

### 📑 Reports

- Today's Report
- Monthly Report
- Yearly Report
- Transaction Summary

### 👤 Profile

- Update Profile Information
- Upload Profile Picture
- Member Since Information

### ⚙️ Settings

- Dark Mode
- Currency Selection
- Notifications
- Logout

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Chart.js
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Helmet
- CORS
- Morgan

---

# 📂 Project Structure

```
smart-expense-tracker
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── config
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/arpita-singha/smart-expense-tracker.git
```

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGO_URI=mongodb+srv://expenseAdmin:expense07@cluster0.nbj3ltc.mongodb.net/?appName=Cluster0
JWT_SECRET=ThisIsMyVeryStrongSecretKey123
```

Run the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

Backend API:

```
http://localhost:5000
```

---

# 🔒 Security Features

- JWT Authentication
- Password Encryption
- Protected API Routes
- Secure File Upload
- Helmet Security Middleware
- CORS Protection

---

# 🎯 Future Improvements

- Export Reports as PDF
- Email Notifications
- Multi-Currency Support
- Recurring Expenses
- Expense Predictions
- Mobile Responsive Enhancements
- Cloud Image Storage
- AI-Based Spending Insights

---

# 👨‍💻 Author

**Arpita Singha**

B.Tech Computer Science & Engineering

Full Stack Web Developer

---

## ⭐ If you found this project helpful, please consider giving it a star.
