import { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("calcHistory")) || [];
  });

  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  const handleClear = () => {
    setValue("");
    setAnswer("");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calcHistory");
  };

  const stepClear = () => {
    setValue((prev) => prev.slice(0, -1));
    setAnswer("");
  };

  const handleClick = (val) => {
    const lastChar = value[value.length - 1];
    const operators = ["+", "-", "*", "/", "×", "÷", "%"];

    if (value === "" && val === "-") {
      setValue("-");
      return;
    }

    if (operators.includes(lastChar) && operators.includes(val)) {
      if (val === "-" && lastChar !== "-") {
        setValue((prev) => prev + val);
      }
      return;
    }

    if (value === "" && operators.includes(val) && val !== "-") return;

    if (val === ".") {
      const parts = value.split(new RegExp(`[\\+\\-\\*\\/×÷%]`));
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes(".")) return;
    }

    setValue((prev) => prev + val);
  };

  const handleEqual = useCallback(() => {
    if (!value) return;

    try {
      const lastChar = value[value.length - 1];
      const operators = ["+", "-", "*", "/", "×", "÷", "%"];
      if (operators.includes(lastChar)) {
        setAnswer("Invalid expression");
        return;
      }

      let expression = value.replace(/×/g, "*").replace(/÷/g, "/");
      if (expression.includes("/0")) {
        setAnswer("Cannot divide by 0");
        return;
      }

const result = Function(`"use strict"; return (${expression})`)();
      if (result === undefined || isNaN(result)) {
        setAnswer("Error");
        return;
      }

      const formattedResult = Number(result.toFixed(4));
      setAnswer(formattedResult);

      if (value.trim() !== "") {
        const now = new Date();
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const formattedTime = now.toLocaleString("en-US", options);
        const newHistoryItem = {
          id: Date.now().toString().slice(-2),
          fullExpression: `${value} = ${formattedResult}`,
          time: formattedTime,
        };

        setHistory((prev) => [...prev, newHistoryItem]);
      }
    } catch (error) {
      setAnswer("Error");
      console.log(error)
    }
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEqual();
        return;
      }

      const allowedKeys = "0123456789+-*/.%";
      let keyToPass = e.key;

      if (e.key === "*") keyToPass = "×";
      if (e.key === "/") keyToPass = "÷";

      if (allowedKeys.includes(e.key) || e.key === "*" || e.key === "/") {
        handleClick(keyToPass);
      }

      if (e.key === "Backspace") stepClear();
      if (e.key.toLowerCase() === "c") handleClear();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEqual]);

  return (
    <div className="calculator-wrapper">
      <h1>Calculator</h1>
      <div className="main-container">
        <div className="history">
          <div className="history-header">
            <h3>History</h3>
            <button
              onClick={handleClearHistory}
              disabled={history.length === 0}
              className="clear-history-btn"
            >
              Clear History
            </button>
          </div>
          <div className="history-list">
            {history.length === 0 && <p>No history</p>}
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <span className="history-expression">
                  {item.fullExpression}
                </span>
                <span className="history-time">({item.time})</span>
              </div>
            ))}
          </div>
        </div>
        <div className="calculator">
          <div className="display-area">
            <div className="input">{value || "0"}</div>
            <div className="result">{answer}</div>
          </div>
          <div className="button-grid">
            <button className="clear-btn" onClick={handleClear}>
              C
            </button>
            <button className="clear-CE" onClick={stepClear}>
              CE
            </button>
            <button className="operator" onClick={() => handleClick("÷")}>
              ÷
            </button>
            <button className="operator" onClick={() => handleClick("×")}>
              ×
            </button>
            {[7, 8, 9].map((n) => (
              <button key={n} onClick={() => handleClick(n.toString())}>
                {n}
              </button>
            ))}
            <button className="operator" onClick={() => handleClick("-")}>
              -
            </button>
            {[4, 5, 6].map((n) => (
              <button key={n} onClick={() => handleClick(n.toString())}>
                {n}
              </button>
            ))}
            <button className="operator" onClick={() => handleClick("+")}>
              +
            </button>
            {[1, 2, 3].map((n) => (
              <button key={n} onClick={() => handleClick(n.toString())}>
                {n}
              </button>
            ))}
            <button className="operator" onClick={() => handleClick("%")}>
              %
            </button>
            <button className="zero-btn" onClick={() => handleClick("0")}>
              0
            </button>
            <button onClick={() => handleClick(".")}>.</button>
            <button className="equal-btn" onClick={handleEqual}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
