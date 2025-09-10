import jwt from "jsonwebtoken";
import pool from "../database/db.js"

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const query = "SELECT * FROM login WHERE usuario = ? AND contraseña = ?";

  try {
    const [result] = await pool.query(query, [username, password])
    if (result.length != 0) {
      if (username == "brianvanelli") {
        const token = jwt.sign({ username, tipo: "real" }, "Stack", {
          expiresIn: "120m",
        });
        return res.json({ token, tipo: "real" });
      } else if (username == "demo" || username == "Demo") {
        const token = jwt.sign({ username, tipo: "demo" }, "Stack", {
          expiresIn: "120m",
        });
        return res.json({ token, tipo: "demo" });
      }
    } else {
      res.status(404).json({message: "Credenciales incorrectas"})
    }
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en la consulta", details: err.sqlMessage });
  }
};