// import { connection } from "../database/db.js";
import pool from '../database/db.js';

// Controladores para manejar las operaciones de gastos

export const getExpenses = async (req, res) => {
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = "SELECT * FROM demo_egresos"
  } else {
    query = "SELECT * FROM egresos"
  }

  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error en getExpenses:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const createExpense = async (req, res) => {
  const { description, amount, date, payment, category } = req.body;
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = `
      INSERT INTO demo_egresos (descripcion, monto, fecha, id_metodo_pago, id_cat_egreso) 
      VALUES (?, ?, ?, ?, ?)
    `;
  } else {
    query = `
      INSERT INTO egresos (descripcion, monto, fecha, id_metodo_pago, id_cat_egreso) 
      VALUES (?, ?, ?, ?, ?)
    `;
  }

  try {
    const [result] = await pool.query(query, [description, amount, date, payment, category]);
    res.json({ message: "Egreso creado", id: result.insertId });
  } catch (err) {
    console.error("Error en createExpense:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, payment, category } = req.body;
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = `
      UPDATE demo_egresos 
      SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_egreso = ? 
      WHERE id_ingreso = ?
    `
  } else {
    query = `
      UPDATE egresos 
      SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_egreso = ? 
      WHERE id_ingreso = ?
    `
  }

  try {
    const [result] = await pool.query(query, [description, amount, date, payment, category, id]);
    res.json({ message: "Egreso actualizado", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Error en updateExpense:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = "DELETE FROM demo_egresos WHERE id_egreso = ?"
  } else {
    query = "DELETE FROM egresos WHERE id_egreso = ?"
  }

  try {
    const [result] = await pool.query(query, [id]);
    res.json({ message: "Egreso eliminado", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Error en deleteExpense:", err);
    res.status(500).json({ error: "Error en la consulta" });
  }
};