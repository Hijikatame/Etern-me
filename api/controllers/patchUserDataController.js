import { getUserByIdModel } from "../models/getUserByIdModel.js";
import { patchUserDataModel } from "../models/patchUserDataModel.js";
import argon2 from "argon2";
import fs from "fs";

export const patchUserDataController = async (req, res) => {
    try {
        const userId = req.user.userId; // ID récupéré grâce au token
        const { pseudo, adresse, phone, gender, oldPassword, newPassword } = req.body;

        // 1. Récupérer les informations actuelles de l'utilisateur
        const user = await getUserByIdModel(userId);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Utilisateur non trouvé",
            });
        }

        const updatedFields = {};

        // 2. Vérification de l'ancien mot de passe si un nouveau est fourni
        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({
                    status: 400,
                    message: "L'ancien mot de passe est requis pour le changer.",
                });
            }

            // Comparer l'ancien mot de passe avec le hash dans la base
            const isPasswordValid = await argon2.verify(user.password, oldPassword);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 401,
                    message: "L'ancien mot de passe est incorrect.",
                });
            }

            // Hachage du nouveau mot de passe
            const hashedPassword = await argon2.hash(newPassword);
            updatedFields.password = hashedPassword;
        }

        // 3. Ajouter les champs à mettre à jour
        if (pseudo && pseudo !== user.pseudo) updatedFields.pseudo = pseudo;
        if (adresse && adresse !== user.adresse) updatedFields.adresse = adresse;
        if (phone && phone !== user.phone) updatedFields.phone = phone;
        if (gender && gender !== user.gender) updatedFields.gender = gender;  // Changement ici

        console.log('req.file', req.file);
        // 4. Gérer l'image
        if (req.file) {
            // Supprimer l'ancienne image si elle existe
            if (user.profile_photo) {
                if (fs.existsSync(user.profile_photo)) {
                    fs.unlinkSync(user.profile_photo); // Supprimer l'image existante
                } else {
                    console.log('Ancienne image non trouvée.');
                }
            }
            updatedFields.profile_photo = req.file.path; // Stocker le chemin de la nouvelle image
        }

        // 5. Vérifier si des modifications ont été faites
        if (!updatedFields.image && Object.keys(updatedFields).length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Aucune modification détectée.",
            });
        }

        // 6. Mettre à jour les informations utilisateur
        await patchUserDataModel(userId, updatedFields);
        return res.status(200).json({
            status: 200,
            message: "Informations utilisateur mises à jour avec succès.",
        });
    } catch (error) {
        console.error("Erreur dans patchUserDataController:", error);
        return res.status(500).json({
            status: 500,
            message: "Erreur serveur",
        });
    }
};
