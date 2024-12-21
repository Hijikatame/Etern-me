// Importation d'Express pour créer un routeur.
import express from 'express';

// Importation des controllers
import { getHealthController } from './controllers/getHealthController.js';
import { getAllUsersController } from './controllers/getAllUsersController.js';
import { postCreateUserController } from './controllers/postCreateUserController.js';
import { getVerifyUserController } from './controllers/getVerifyUserController.js';
import { postLoginUserController } from './controllers/postLoginUserController.js';
import { getUserController } from './controllers/getUserController.js';
import { patchUserDataController } from './controllers/patchUserDataController.js'

// Importation des middlewares
import { validateUserData } from './middlewares/validateUserData.js';
import { hashPassword } from './middlewares/hashPassword.js';
import { authenticateToken } from './middlewares/authenticateToken.js';
import { uploadImage } from './middlewares/uploadImage.js';
import { postLogoutUserController } from './controllers/postLogoutUserController.js';

// Création d'une instance de routeur
const router = express.Router();

// Définition des routes du tableau de bord (Dashboard)
    // Route pour vérifier la vie de l'API
router.get('/health', getHealthController);

    // Route pour afficher les users
router.get('/users', getAllUsersController);

    // Route pour récupérer les informations d'un user
router.get('/user', authenticateToken, getUserController);

    // Route pour créer un user
router.post('/register', validateUserData, hashPassword, postCreateUserController);

    // Route pour la vérification d'un nouveau user
router.get('/verify', getVerifyUserController);

    // Route pour la connexion
router.post('/login', postLoginUserController);

    // Route pour modifier les informations d'un user
router.patch('/update', authenticateToken, hashPassword, uploadImage.single('profile_photo'), patchUserDataController);

    // Route pour deconnecter un user
router.post('/logout', authenticateToken, postLogoutUserController);



// Exportation du routeur pour qu'il puisse être utilisé dans d'autres fichiers
export default router;