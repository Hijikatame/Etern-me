import { postLogoutUserModel } from "../models/postLogoutUserModel.js";

export const postLogoutUserController = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.userId; // ID récupéré depuis le token décrypté
        
        // Appel du modèle pour supprimer le token
        await postLogoutUserModel(userId);
        
        return res.status(200).json({ 
            status: 200,
            message: "Déconnexion réussie" 
        });
    } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        return res.status(500).json({ 
            status: 500,
            message: "Erreur serveur lors de la déconnexion." 
        });
    }
};