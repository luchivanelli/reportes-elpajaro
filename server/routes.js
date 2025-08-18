import express from 'express';
import { connection } from './database/db.js';
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

router.get("/incomes/categories", (req, res) => {
  connection.query("SELECT * FROM cat_ingreso", (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result);
  })
})

router.get("/expenses/categories", (req, res) => {
  connection.query("SELECT * FROM cat_egreso", (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result);
  })
})

router.get("/payments", (req, res) => {
  connection.query("SELECT * FROM metodo_pago", (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result);
  })
})