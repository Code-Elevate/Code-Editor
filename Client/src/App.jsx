import React from "react";
import CodeEditor from "./components/CodeEditor";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route
        path="/"
        element={<CodeEditor width={"100vw"} height={"100vh"} />}
      />
    </Routes>
  );
};

export default App;
