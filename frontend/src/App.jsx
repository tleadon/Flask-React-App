import nibLogo from "./assets/niblogo.png";
import "./App.css";
import Form from "../components/Form.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Nav from "../components/Nav.jsx";
import { ApiContext } from "../context/ApiContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div style={{ minHeight: "calc(100vh)", paddingTop: "50px" }}>
          <div>
            <a href="/">
              <img src={nibLogo} className="logo react" alt="NIB logo" />
            </a>
            <h1>NIB Info API</h1>
          </div>
          <ApiContext.Provider value={{ apiKey: null, setApiKey: () => {} }}>
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </ApiContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
