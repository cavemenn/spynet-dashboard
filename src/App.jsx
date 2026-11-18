import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// If you haven't already, install the required dependencies:
// npm install react-bootstrap bootstrap react-router-dom

import { AuthContext } from "./AuthContext";
import RequireAuth from "./components/RequireAuth";
import { useLocalStorage } from "usehooks-ts";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";


export default function App() {
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route element={<RequireAuth><Dashboard /></RequireAuth>} path="/dashboard" />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
