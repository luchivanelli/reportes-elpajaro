import express from 'express';
import cors from 'cors';
import { router } from './routes.js';
// import { connection } from './database/db.js';
import pool from './database/db.js';
import { verifyToken } from './middleware/verifyToken.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// // Conectar a la base de datos
// connection.connect((err) => {
//   if (err) {
//     console.error('Error de conexión: ' + err.stack);
//     return;
//   }
//   console.log('Conectado a la base de datos con el id ' + pool.threadId);
// });

app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', "https://reportes-elpajaro.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", async (req, res) => {
  try {
    // test rápido de conexión
    res.send("Servidor corriendo y DB conectada ✅");
  } catch (err) {
    console.error("Error probando DB:", err);
    res.status(500).send("Error conectando con la DB ❌");
  }
});

//Permite que funcione el "req.body" en los controllers
app.use(express.json());

//Establece el uso de todos endpoints (rutas)
app.use("/", router)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;