import { useState } from "react";
import Shop from "./Shop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen bg-red-50">
        <Shop />
      </div>
    </>
  );
}

export default App;
