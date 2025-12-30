import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./api/api";
import Login from "./components/Login";
import Home from "./pages/Home";
import Register from "./components/Register";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import NotFound from "./components/NotFound";

function App() {
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        setAuth(res.data.user);
      } catch {
        setAuth(null);
      }
    };

    fetchMe();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
