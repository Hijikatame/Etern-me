import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

export const authenticateToken = async (req, res, next) => {
    // Charger les variables d'environnement depuis .env
    dotenv.config();
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ 
            status: 401,
            message: "Accès non autorisé" 
        });
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                status: 403,
                message: "Token invalide" 
            });
        }
        req.user = user;
        console.log(user);
        next();
    });
}