import { useState } from "react";

import "./App.css";
import Comments from "./Components/Comments/Comments";

function App() {
  return (
    <div className="bg-purple-900 h-screen p-5 text-white overflow-auto">
      <div className="flex justify-center">
        <h2 className="font-Poppins text-2xl ">React Nested Comment Section</h2>
      </div>
      <div className="mt-10">
        <Comments />
      </div>
    </div>
  );
}

export default App;
