
import React, { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React Counter App</h2>
      <h1>{count}</h1>
      <div>
        <button onClick={handleIncrement}>Increment (+)</button>
        <button onClick={handleDecrement}>Decrement (-)</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;