import database from '../db/database.js';

export const postLogoutUserModel = async (userId) => {
    try {
        await database.query("DELETE FROM sessions WHERE user_id = ?", [userId]);
    } catch (error) {
        console.error("Erreur lors de la suppression du token:", error);
        throw error;
    }
};