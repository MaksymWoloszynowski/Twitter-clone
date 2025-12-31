import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import api from "../api/api.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../hooks/useAuth.js";

const Login = () => {
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", { email, password });
      const me = await api.get("/auth/me");
      setAuth(me.data.user);
      
      setEmail("");
      setPassword("");
      me.data.user.role === "user" ? navigate("/home") : navigate("/admin")
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setErrMsg(message);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <p className={errMsg ? styles.error : styles.invisible}>{errMsg}</p>
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={styles.input}
          />

          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className={styles.input}
          />
          <button className={styles.button}>Sign In</button>
        </form>

        <div className={styles.footer_text}>
          <p> Need an Account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
