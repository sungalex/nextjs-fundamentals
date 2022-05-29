import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Hello World!!!</h1>
      <h2>Count: {counter}</h2>
      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
    </div>
  );
}
