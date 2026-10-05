import { pool } from "../db.js";

const checkHealth = async (req, res) => {
  let postgresStatus = "down";

  try {
    await pool.query("SELECT 1");
    postgresStatus = "up";
  } catch (err) {
    console.error("Postgres healthcheck failed:", err.message);
  }

  const isHealthy = postgresStatus === "up";

  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    postgres: postgresStatus,
    uptime: process.uptime(),
  });
};

export default {
  checkHealth,
};