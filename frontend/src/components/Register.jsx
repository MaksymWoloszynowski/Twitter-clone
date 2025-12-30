import { useRef, useState, useEffect } from "react";
import api from "../api/api.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,24}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,128}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    console.log(usernameFocus && username && !validUsername);
  }, [username]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      setUsername("");
      setPassword("");
      setMatchPassword("");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setErrMsg(message);
    }
  };

  return (
    <section className={styles.container}>
      <p className={errMsg ? styles.error : styles.invisible}>
        {errMsg}
      </p>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-invalid={validUsername ? "false" : "true"}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          className={`${styles.input} ${
            username
              ? validUsername
                ? styles.valid_input
                : styles.invalid_input
              : ""
          }`}
        />
        <p
          id="uidnote"
          className={
            usernameFocus && username && !validUsername
              ? styles.instructions
              : styles.invisible
          }
        >
          {" "}
          Username: 4–25 characters, start with a letter, can include letters,
          numbers, _ or -
        </p>
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          className={`${styles.input} ${
            email
              ? validEmail
                ? styles.valid_input
                : styles.invalid_input
              : ""
          }`}
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
          aria-invalid={validPassword ? "false" : "true"}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          className={`${styles.input} ${
            password
              ? validPassword
                ? styles.valid_input
                : styles.invalid_input
              : ""
          }`}
        />
        <p
          id="pwdnote"
          className={
            passwordFocus && !validPassword
              ? styles.instructions
              : styles.invisible
          }
        >
          8–128 characters, include uppercase, lowercase, a number, and a
          special character.
        </p>

        <label className={styles.label} htmlFor="confirm_pwd">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPassword(e.target.value)}
          value={matchPassword}
          required
          aria-invalid={validMatch ? "false" : "true"}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          className={`${styles.input} ${
            matchPassword
              ? validMatch
                ? styles.valid_input
                : styles.invalid_input
              : ""
          }`}
        />
        <p
          id="confirmnote"
          className={
            matchFocus && !validMatch ? styles.instructions : styles.invisible
          }
        >
          Must match the first password input field.
        </p>

        <button className={styles.button}>Sign Up</button>
      </form>
      <div className={styles.footer_text}>
        <p>Already registered?</p>
        <Link to="/login">Sign In</Link>
      </div>
    </section>
  );
};

export default Register;
