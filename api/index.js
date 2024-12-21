// Importation des modules nécessaires
import express from 'express'; // Framework pour créer un serveur web.
import cors from 'cors';
import dotenv from 'dotenv'; // Module pour gérer les variables d'environnement.
import path from 'path';

// Importation du routeur défini dans un fichier séparé
import router from './router.js';

// Chargement des variables d'environnement depuis un fichier .env
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Autoriser toutes les origines pour la simplicité
app.use(cors({
    origin: 'http://localhost:5173',  // Autoriser uniquement cette origine
    credentials: true,
}));

// Récupération du port défini dans le fichier .env
const port = process.env.APP_PORT;

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Chemin pour le dossier uplaod 
app.use('/uploads', express.static('uploads'));

// Middleware pour servir les fichiers statiques
app.use('/uploads', express.static(path.resolve('./uplaods')));

// Middleware pour définir le préfixe des routes de l'API
// Toutes les routes définies dans le routeur seront accessibles via /api
app.use('/api', router);

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Le serveur écoute le port http://localhost:${port}/api.`);
});