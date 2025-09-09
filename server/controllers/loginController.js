import jwt from "jsonwebtoken";
import pool from "../database/db.js"

export const login = async (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM login WHERE usuario = ? AND contraseña = ?";

  try {
    const [result] = await pool.query(query, [username, password])
    if (result.length != 0) {
      if (username == "demo") {
        const token = jwt.sign({ username, tipo: "demo" }, "Stack", {
          expiresIn: "20s",
        });
        return res.json({ token, tipo: "demo" });
      } else {
        const token = jwt.sign({ username, tipo: "real" }, "Stack", {
          expiresIn: "20s",
        });
        return res.json({ token, tipo: "real" });
      }
    } else {
      res.status(404).json({message: "Credenciales incorrectas"})
    }
  } catch {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en la consulta", details: err.sqlMessage });
  }
};