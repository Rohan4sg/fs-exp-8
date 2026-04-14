import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const token = localStorage.getItem("token");

  let role = "";

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {role === "admin" ? (
        <h2>🔐 Admin Panel</h2>
      ) : (
        <h2>👤 User Panel</h2>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;