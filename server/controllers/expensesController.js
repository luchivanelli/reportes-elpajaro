// import { connection } from "../database/db.js";
import pool from '../database/db.js';

// Controladores para manejar las operaciones de gastos

export const getExpenses = (req, res) => {
  pool.query("SELECT * FROM egresos", (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result);
  })
}

export const createExpense = (req, res) => {
  const { description, amount, date, payment, category } = req.body;
  const query = "INSERT INTO egresos (descripcion, monto, fecha, id_metodo_pago, id_cat_egreso) VALUES (?, ?, ?, ?, ?)"

  pool.query(query, [description, amount, date, payment, category], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result)
  })
}

export const updateExpense = (req, res) => {
  const { id } = req.params;
  const { description, amount, date, payment, category } = req.body;
  const query = "UPDATE egresos SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_egreso = ? WHERE id_egreso = ?"

  pool.query(query, [description, amount, date, payment, category, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result)
  })
}

export const deleteExpense = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM egresos WHERE id_egreso = ?"

  pool.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result)
  })
}