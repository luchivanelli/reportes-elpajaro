import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;
  
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, "Stack", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    
    req.user = decoded;
    next();
  });
};