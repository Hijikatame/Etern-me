import { getUserByIdModel } from "../models/getUserByIdModel.js"

export const getUserController = async (req, res) => {
    try {
        const user = await getUserByIdModel(req.user.userId);
         if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Utilisateur non trouvé"
            });
         }
         res.json(user);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: "Erreur serveur" 
        });
    }
}