import nibLogo from "./assets/niblogo.png";
import "./App.css";
import Form from "../components/Form.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Nav from "../components/Nav.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div>
          <a href="/">
            <img src={nibLogo} className="logo react" alt="NIB logo" />
          </a>
        </div>
        <h1>NIB Info API</h1>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
