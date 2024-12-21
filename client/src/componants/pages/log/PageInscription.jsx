import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../modules/PageConnexionInscription.module.css";
import escapeHtml from "../../../const/escapeHtml.jsx";

export default function PageInscription() {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialiser les erreurs à chaque soumission

        // Valider les entrées
        const sanitizedPseudo = escapeHtml(pseudo);
        const sanitizedEmail = escapeHtml(email);
        const sanitizedPassword = escapeHtml(password);

        // Vérification basique de l'email avec une expression régulière
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(sanitizedEmail)) {
            setError("Veuillez entrer un email valide.");
            return;
        }

        // Vérification basique du mot de passe avec une expression régulière
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordPattern.test(sanitizedPassword)) {
            setError("Le mot de passe doit faire au moins 8 caratères, posséder une majuscule, une minuscule, un chiffre et un caratère spécial");
            return;
        }
        
        // Préparer les données
        const loginData = {
            pseudo: sanitizedPseudo,
            email: sanitizedEmail,
            password: sanitizedPassword,
        };

        setIsSubmitting(true); // Désactiver le bouton lors de la soumission

        try {
            // Envoi de la requête à l'API
            const response = await fetch("http://localhost:5500/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
                mode: "cors",
            });

            if (!response.ok) {
                // Si la réponse n'est pas OK, on récupère l'erreur
                const errorData = await response.json();
                setError(errorData.message || "Erreur inconnue");
            } else {
                // Si tout va bien, on parse la réponse et on redirige
                const data = await response.json();

                // Redirection vers la page de connexion
                navigate("/connexion");
            }
        } catch (error) {
            // Gestion des erreurs de requêtes (par exemple, réseau, serveur)
            console.error("Une erreur est survenue :", error);
            setError("Une erreur est survenue, veuillez réessayer.");
        } finally {
            setIsSubmitting(false); // Réactive le bouton quel que soit l'état de la requête
        }
    };

    return (
        <>
            <section className={`flex flex-column flex-center height100 ${styles.heroBackground} ${styles.hero}`}>
                <h1 className={`color-white`}>Inscription</h1>
                <form onSubmit={handleSubmit} className={`flex flex-column gap-large`}>
                    {error && <p className={`color-ini`}>{error}</p>}
                    <div className={`flex flex-column`}>
                        <label htmlFor="email" className={`color-white`}>Pseudo</label>
                        <input
                            type="test"
                            id="pseudo"
                            className={`input`}
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            required
                        />
                    </div>
                    <div className={`flex flex-column`}>
                        <label htmlFor="email" className={`color-white`}>Email</label>
                        <input
                            type="email"
                            id="email"
                            className={`input`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={`flex flex-column`}>
                        <label htmlFor="password" className={`color-white`}>Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            className={`input`}
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`color-white uppercase background-matisse button`}
                        disabled={isSubmitting}  // Désactiver le bouton pendant la soumission
                    >
                        {isSubmitting ? "Chargement..." : "S'inscrire"}
                    </button>
                </form>
            </section>
        </>
    );
}