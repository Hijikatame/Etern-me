import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../modules/PageMembre.module.css";
import authenticateToken from "../../../const/authenticateToken";

export default function PageMembre() {
    const [userData, setUserData] = useState(null); // Stockage des données utilisateur
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Récupération des données utilisateur
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await authenticateToken(); // Appel de la fonction utilitaire
                setUserData(data);
            } catch (err) {
                console.error(err.message);
                setError("Erreur d'authentification. Redirection...");
                navigate("/connexion"); // Rediriger en cas d'erreur
            }
        };

        fetchData();
    }, [navigate]);

    // Déconnexion
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/connexion"); // Si aucun token, redirection immédiate
            return;
        }
        
        try {
            // Appeler l'API pour révoquer le token
            const response = await fetch("http://localhost:5500/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                localStorage.removeItem("token"); // Supprimer le token local
                navigate("/connexion"); // Rediriger vers la page de connexion
            } else {
                const errorData = await response.json();
                console.error("Erreur lors de la déconnexion:", errorData.message);
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    // Affichage des données utilisateur
    return (
        <section className={`background-brown height100 padding-section ${styles.infoMembre}`}>
            {error && <p className="color-ini">{error}</p>}
            {userData ? (
                <div className={`flex flex-column gap-medium`}>
                    <h1 className="color-white">{userData.pseudo}</h1>
                    <img
                        src={`http://localhost:5500/${userData.profile_photo || "default-avatar.png"}`}
                        alt="Photo de profil"
                    />
                    <button
                        onClick={() => navigate("/membre/update")} // Rediriger vers la page de modification
                        className={`button color-white background-matisse`}
                    >
                        Modifier mes informations
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`button color-white background-matisse`}
                    >
                        Se déconnecter
                    </button>
                </div>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </section>
    );
}
