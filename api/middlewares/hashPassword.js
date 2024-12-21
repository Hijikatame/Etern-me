import argon2 from "argon2";

export const hashPassword = async (req, res, next) => {
    try {
        // Pour l'inscription : hachage du mot de passe principal
        if (req.body.password) {
            const hashedPassword = await argon2.hash(req.body.password);
            req.body.password = hashedPassword; // Remplacer par le hash
        }

        // Pour la mise à jour du profil : hachage du nouveau mot de passe
        if (req.body.newPassword) {
            const hashedPassword = await argon2.hash(req.body.newPassword);
            req.body.newPassword = hashedPassword; // Remplacer par le hash
        }

        next(); // Passer au prochain middleware
    } catch (error) {
        console.error("Erreur lors du hachage du mot de passe :", error);
        return res.status(500).json({
            status: 500,
            message: "Erreur interne lors du traitement du mot de passe.",
        });
    }
};
