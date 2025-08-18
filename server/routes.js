import express from 'express';
// import { connection } from './database/db.js';
import pool from './database/db.js';
import { verifyToken } from './middleware/verifyToken.js'
import { getIncomes, createIncome, updateIncome, deleteIncome } from './controllers/incomeController.js';
import { getExpenses ,createExpense, updateExpense, deleteExpense } from './controllers/expensesController.js';

export const router = express.Router()

router.get("/incomes", getIncomes);
router.post("/incomes", createIncome);
router.put("/incomes/:id", updateIncome);
router.delete("/incomes/:id", deleteIncome);

router.get("/expenses", getExpenses);
router.post("/expenses", createExpense);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);  

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