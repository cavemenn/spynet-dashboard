import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// If you haven't already, install the required dependencies:
// npm install react-bootstrap bootstrap react-router-dom

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
