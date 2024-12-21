import database from '../db/database.js';

export const patchUserDataModel = async (userId, updatedFields) => {
    try {
        const fields = Object.keys(updatedFields);
        const values = Object.values(updatedFields);

        // Construire dynamiquement la requête SQL
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        const query = `UPDATE users SET ${setClause} WHERE id = ?`;

        // Ajouter l'ID à la fin des valeurs
        values.push(userId);

        await database.query(query, values);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        throw error;
    }
};
