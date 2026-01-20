# 🧮 React Calculator App

A modern calculator built with **React.js** featuring keyboard support, calculation history, and localStorage persistence.

---

## 🚀 Features

- Basic arithmetic operations (+, -, ×, ÷, %)
- Keyboard input support
- Calculation history with timestamps
- Persistent history using localStorage
- Clear (C) and Step Clear (CE)
- Error handling (invalid expressions, divide by zero)
- Responsive and clean UI

---

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- CSS
- LocalStorage API

---

## 📂 Project Structure

src/
│── App.js
│── App.css
│── index.js

---

## ⌨️ Keyboard Shortcuts

| Key           | Action           |
| ------------- | ---------------- |
| Numbers (0–9) | Input numbers    |
| + - \* / %    | Operators        |
| Enter         | Calculate result |
| Backspace     | Step clear       |
| C             | Clear all        |

---

## 🧠 How It Works

- User input is stored in state
- Expression is validated before evaluation
- Result is calculated dynamically
- History is saved with date & time
- Data persists using localStorage

---

## ▶️ Run Locally

```bash
npm install
npm start
```
