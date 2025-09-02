// import { connection } from "../database/db.js";
import pool from "../database/db.js";

// Controladores para manejar las operaciones de ingresos

export const getIncomes = async (req, res) => {
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = "SELECT * FROM demo_ingresos"
  } else {
    query = "SELECT * FROM ingresos"
  }

  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error en getIncomes:", err);
    res.status(500).json({ error: err, details: err.sqlMessage });
  }
};

export const createIncome = async (req, res) => {
  const { description, amount, date, payment, category } = req.body;
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = `
      INSERT INTO demo_ingresos (descripcion, monto, fecha, id_metodo_pago, id_cat_ingreso) 
      VALUES (?, ?, ?, ?, ?)
    `;
  } else {
    query = `
      INSERT INTO ingresos (descripcion, monto, fecha, id_metodo_pago, id_cat_ingreso) 
      VALUES (?, ?, ?, ?, ?)
    `;
  }

  try {
    const [result] = await pool.query(query, [description, amount, date, payment, category]);
    res.json({ message: "Ingreso creado", id: result.insertId });
  } catch (err) {
    console.error("Error en createIncome:", err);
    res.status(500).json({ error: err, details: err.sqlMessage });
  }
};

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, payment, category } = req.body;
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = `
      UPDATE demo_ingresos 
      SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_ingreso = ? 
      WHERE id_ingreso = ?
    `
  } else {
    query = `
      UPDATE ingresos 
      SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_ingreso = ? 
      WHERE id_ingreso = ?
    `
  }

  try {
    const [result] = await pool.query(query, [description, amount, date, payment, category, id]);
    res.json({ message: "Ingreso actualizado", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Error en updateIncome:", err);
    res.status(500).json({ error: "Error en la consulta", details: err.sqlMessage });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.user;
  let query
  if (tipo == "demo") {
    query = "DELETE FROM demo_ingresos WHERE id_ingreso = ?"
  } else {
    query = "DELETE FROM ingresos WHERE id_ingreso = ?"
  }

  try {
    const [result] = await pool.query(query, [id]);
    res.json({ message: "Ingreso eliminado", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("Error en deleteIncome:", err);
    res.status(500).json({ error: "Error en la consulta", details: err.sqlMessage });
  }
};