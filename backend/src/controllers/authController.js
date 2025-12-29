import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExists = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userExists.rowCount > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const usernameTaken = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (usernameTaken.rowCount > 0) {
      return res.status(409).json({ message: "Username taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].id);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userData.id);

    res.cookie("token", token, cookieOptions);

    res.json({
      user: {
        id: userData.id,
        name: userData.username,
        email: userData.email,
        role: userData.role
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out" });
};

const me = (req, res) => {
  res.json({ user: req.user });
}

export default { register, login, logout, me };
