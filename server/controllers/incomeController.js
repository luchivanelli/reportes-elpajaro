import { connection } from "../database/db.js";

// Controladores para manejar las operaciones de ingresos

export const getIncomes = (req, res) => {
  connection.query("SELECT * FROM ingresos", (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result);
  })
}

export const createIncome = (req, res) => {
  const { description, amount, date, payment, category } = req.body;
  const query = "INSERT INTO ingresos (descripcion, monto, fecha, id_metodo_pago, id_cat_ingreso) VALUES (?, ?, ?, ?, ?)"

  connection.query(query, [description, amount, date, payment, category], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result)
  })
}

export const updateIncome = (req, res) => {
  const { id } = req.params;
  const { description, amount, date, payment, category } = req.body;
  const query = "UPDATE ingresos SET descripcion = ?, monto = ?, fecha = ?, id_metodo_pago = ?, id_cat_ingreso = ? WHERE id_ingreso = ?"

  connection.query(query, [description, amount, date, payment, category, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result)
  })
}

export const deleteIncome = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM ingresos WHERE id_ingreso = ?"

  connection.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(result)
  })
}