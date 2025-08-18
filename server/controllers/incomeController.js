// import { connection } from "../database/db.js";
import pool from "../database/db";

// Controladores para manejar las operaciones de ingresos

export const getIncomes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ingresos");
    res.json(rows);
  } catch (err) {
    console.error("Error en getIncomes:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const createIncome = async (req, res) => {
  const { description, amount, date, payment, category } = req.body;
  const query = `
    INSERT INTO ingresos (descripcion, monto, fecha, id_metodo_pago, id_cat_ingreso) 
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.query(query, [description, amount, date, payment, category]);
    res.json({ message: "Ingreso creado", id: result.insertId });
  } catch (err) {
    console.error("Error en createIncome:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, payment, category } = req.body;
  const query = `
    UPDATE ingresos 
    SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_ingreso = ? 
    WHERE id_ingreso = ?
  `;
  try {
    const [result] = await pool.query(query, [description, amount, date, payment, category, id]);
    res.json({ message: "Ingreso actualizado", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Error en updateIncome:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM ingresos WHERE id_ingreso = ?";
  try {
    const [result] = await pool.query(query, [id]);
    res.json({ message: "Ingreso eliminado", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Error en deleteIncome:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};