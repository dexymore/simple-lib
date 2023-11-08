import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";

import AddNewBook from "./components/AddNewBook";

import "bootstrap/dist/css/bootstrap.min.css";

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/add" element={<AddNewBook />} exact />
    </Routes>
  );
}

export default App;
