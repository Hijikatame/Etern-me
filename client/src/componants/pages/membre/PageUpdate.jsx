import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../modules/PageUpdate.module.css";
import authenticateToken from "../../../const/authenticateToken.jsx";
import escapeHtml from "../../../const/escapeHtml.jsx";
import validatePassword from "../../../const/validatePassword.jsx";

export default function PageUpdate() {
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

    const [pseudo, setPseudo] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedGenreAutre, setSelectedGenreAutre] = useState(null);
    const [adresse, setAdresse] = useState("");
    const [phone, setPhone] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const genreOptions = [
        { value: "", label: "-- Sélectionnez une option --" },
        { value: "Homme", label: "Homme" },
        { value: "Femme", label: "Femme" },
        { value: "Non-binaire", label: "Non-binaire" },
        { value: "Autre", label: "Autre ... veuillez préciser" },
        { value: "PréféréNePasRépondre", label: "Je préfère ne pas répondre" },
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl); // Rendu temporaire
            setImageFile(file); // Fichier pour la requete
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (pseudo && pseudo !== userData.pseudo) {
            if (!pseudo || pseudo.length < 3) {
                setError("Le pseudo doit contenir au moins 3 caractères.");
                return;
            }
        }
        
        if (newPassword) {
            if (!validatePassword(newPassword)) {
                setError(
                    "Le nouveau mot de passe doit contenir au moins 8 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
                );
                return;
            }
        }
        
        // Comparaison des champs pour identifier ceux qui ont changé
        const updatedData = new FormData();
        if (pseudo && pseudo !== userData.pseudo) updatedData.append("pseudo", escapeHtml(pseudo));
        if (adresse && adresse !== userData.adresse) updatedData.append("adresse", escapeHtml(adresse));
        if (phone && phone !== userData.phone) updatedData.append("phone", escapeHtml(phone));
        if (selectedGenre === "Autre" && selectedGenreAutre) updatedData.append("gender", escapeHtml(selectedGenreAutre));
        else if (selectedGenre && selectedGenre !== userData.gender) updatedData.append("gender", escapeHtml(selectedGenre));

        // Si un fichier image est sélectionné
        if (imageFile.name.length > 0) {
            updatedData.append("profile_photo", imageFile); // Ajoutez le fichier image directement à FormData
        }

        if (newPassword) updatedData.append("newPassword", escapeHtml(newPassword));
        updatedData.append("password", escapeHtml(oldPassword));
        
        // Ajouter l'ancien mot de passe pour validation
        updatedData.password = escapeHtml(oldPassword);

        // Récupération du token
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Utilisateur non authentifié. Veuillez vous reconnecter.");
            navigate("/connexion");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5500/api/update", {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: updatedData,
            });
            console.log("Réponse brute:", response);
            console.log(updatedData);
            if (response.ok) {
                navigate("/membre");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erreur inconnue");
            }
        } catch (error) {
            console.error("Une erreur est survenue :", error);
            setError("Une erreur est survenue, veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!userData) {
        return <p>Chargement des informations...</p>;
    }

    // Affichage des données utilisateur
    return (
        <section className={`flex flex-column flex-center ${styles.background} ${styles.hero}`}>
            <h1 className="color-white">Modifier vos données</h1>
            {error && <p className="color-ini">{error}</p>}
            <form onSubmit={handleSubmit}  encType="multipart/form-data" className="flex flex-column gap-large">
                <div className="flex flex-column">
                    <label htmlFor="pseudo" className="color-white">Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        className="input"
                        placeholder={userData.pseudo || ""}
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>
                <div className="flex flex-column flex-center">
                    <label htmlFor="image" className="color-white">Image</label>
                    <img src={profileImage || userData.image || "https://via.placeholder.com/150"} alt="Profile" className={`${styles.img}`} />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="flex flex-column">
                    <label htmlFor="oldPassword" className="color-white">Ancien mot de passe</label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="input"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-column">
                    <label htmlFor="newPassword" className="color-white">Nouveau mot de passe</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="input"
                        placeholder="Laissez vide si non modifié"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-column">
                    <label htmlFor="genre" className="color-white">Votre genre</label>
                    <select
                        value={selectedGenre}
                        id="genre"
                        className="input"
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        {genreOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {selectedGenre === "Autre" && (
                        <input
                            type="text"
                            className="input"
                            placeholder={userData.genre || ""}
                            value={selectedGenreAutre}
                            onChange={(e) => setSelectedGenreAutre(e.target.value)}
                        />
                    )}
                </div>
                <div className="flex flex-column">
                    <label htmlFor="adresse" className="color-white">Adresse</label>
                    <input
                        type="text"
                        id="adresse"
                        className="input"
                        placeholder={userData.adresse || ""}
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                    />
                </div>
                <div className="flex flex-column">
                    <label htmlFor="phone" className="color-white">Numéro de téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        className="input"
                        placeholder={userData.phone || ""}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="color-white uppercase background-matisse button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Chargement..." : "Modifier"}
                </button>
            </form>
        </section>
    );
}