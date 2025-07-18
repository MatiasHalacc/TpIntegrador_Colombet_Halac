import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado', token: '' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Ahora tenés el usuario disponible en req.user
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido', token: '' });
  }
};