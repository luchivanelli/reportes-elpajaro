import express from 'express';
// import { connection } from './database/db.js';
import pool from './database/db.js';
import { verifyToken } from './middleware/verifyToken.js'
import { getIncomes, createIncome, updateIncome, deleteIncome } from './controllers/incomeController.js';
import { getExpenses ,createExpense, updateExpense, deleteExpense } from './controllers/expensesController.js';
import { login } from './controllers/loginController.js';

export const router = express.Router()

router.get("/login", (req, res) => {
  res.json({message: "conexion exitosa"})
})
router.post("/login", login)

router.get("/incomes", verifyToken, getIncomes);
router.post("/incomes", verifyToken, createIncome);
router.put("/incomes/:id", verifyToken, updateIncome);
router.delete("/incomes/:id", verifyToken, deleteIncome);

router.get("/expenses", verifyToken, getExpenses);
router.post("/expenses", verifyToken, createExpense);
router.put("/expenses/:id", verifyToken, updateExpense);
router.delete("/expenses/:id", verifyToken, deleteExpense);  

router.get("/incomes/categories", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cat_ingreso");
    res.json(rows);
  } catch (err) {
    console.error("Error en /incomes/categories:", err.sqlMessage || err);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

router.get("/expenses/categories", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cat_egreso");
    res.json(rows);
  } catch (err) {
    console.error("Error en /expenses/categories:", err.sqlMessage || err);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

router.get("/payments", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM metodo_pago");
    res.json(rows);
  } catch (err) {
    console.error("Error en /payments:", err.sqlMessage || err);
    res.status(500).json({ error: "Error en la consulta" });
  }
});