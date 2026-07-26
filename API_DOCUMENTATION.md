# Smart Expense Tracker API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

Most endpoints require JWT Authentication.

Add the following header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Authentication APIs

## Register User

### Endpoint

```
POST /users/register
```

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```
POST /users/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

# Expense APIs

## Get All Expenses

### Endpoint

```
GET /expenses
```

### Headers

```
Authorization: Bearer <TOKEN>
```

### Response

```json
{
  "success": true,
  "count": 5,
  "expenses": []
}
```

---

## Add Expense

### Endpoint

```
POST /expenses
```

### Request Body

```json
{
  "title": "Food",
  "amount": 500,
  "category": "Food",
  "date": "2026-07-26"
}
```

---

## Delete Expense

### Endpoint

```
DELETE /expenses/:id
```

---

# Income APIs

## Get All Income

### Endpoint

```
GET /income
```

---

## Add Income

### Endpoint

```
POST /income
```

### Request Body

```json
{
  "title": "Salary",
  "amount": 25000,
  "source": "Job",
  "date": "2026-07-26"
}
```

---

## Delete Income

### Endpoint

```
DELETE /income/:id
```

---

# Dashboard API

## Get Dashboard Summary

### Endpoint

```
GET /dashboard
```

### Response

```json
{
  "summary": {
    "totalIncome": 50000,
    "totalExpenses": 18000,
    "currentBalance": 32000
  }
}
```

---

# Budget APIs

## Get Budget

### Endpoint

```
GET /budgets
```

---

## Save Budget

### Endpoint

```
POST /budgets
```

### Request Body

```json
{
  "monthlyBudget": 30000,
  "savingGoal": 10000
}
```

---

# Reports APIs

## Today's Report

### Endpoint

```
GET /reports/today
```

### Response

```json
{
  "success": true,
  "totalIncome": 3000,
  "totalExpense": 1500,
  "balance": 1500,
  "transactions": 4
}
```

---

## Monthly Report

### Endpoint

```
GET /reports/month
```

---

## Yearly Report

### Endpoint

```
GET /reports/year
```

---

# Profile APIs

## Get Profile

### Endpoint

```
GET /users/profile
```

### Response

```json
{
  "success": true,
  "user": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "gender": "Male",
    "occupation": "Software Engineer",
    "address": "Kolkata",
    "profileImage": "/uploads/profile/image.png"
  }
}
```

---

## Update Profile

### Endpoint

```
PUT /users/profile
```

### Request Body

```json
{
  "fullName": "John Doe",
  "phone": "9876543210",
  "gender": "Male",
  "occupation": "Software Engineer",
  "address": "Kolkata"
}
```

---

## Upload Profile Picture

### Endpoint

```
POST /users/profile/upload
```

### Content-Type

```
multipart/form-data
```

### Form Data

| Key   | Type |
| ----- | ---- |
| image | File |

### Response

```json
{
  "success": true,
  "profileImage": "/uploads/profile/12345.png"
}
```

---

# Error Responses

## Unauthorized

```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```

---

## Bad Request

```json
{
  "success": false,
  "message": "Validation Error"
}
```

---

## Server Error

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# HTTP Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# API Summary

| Module         | Endpoints |
| -------------- | --------- |
| Authentication | 2         |
| Expense        | 3         |
| Income         | 3         |
| Dashboard      | 1         |
| Budget         | 2         |
| Reports        | 3         |
| Profile        | 3         |

**Total APIs:** **17**

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- REST API Architecture

---

# Testing

The APIs can be tested using:

- Postman
- Thunder Client
- Insomnia
- cURL
