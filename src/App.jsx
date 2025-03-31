import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit/:id" element={<EditUser />} /> {/* Correct Route */}
      </Routes>
    </Router>
  );
}

export default App;
