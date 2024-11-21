import React, { useState } from "react";
// import { statsList } from "../../../const/const.jsx";
// Imporation des styles modules CSS
import styles from "../../../modules/PagePersonnage.module.css";


export default function PagePersonnage() {
    const [selectedImage, setSelectedImage] = useState(null); // État pour stocker l'URL de l'image
    const [openArticle, setOpenArticle] = useState(null); // Par défault tout les article sont fermé

// Liste des caractéristiques
const statsList = [
    { key: "force", label: "Force", colorClass: "color-for", bgClass: "background-for", borderClass: styles.borderFor },
    { key: "intelligence", label: "Intelligence", colorClass: "color-int", bgClass: "background-int", borderClass: styles.borderInt },
    { key: "dexterite", label: "Dextérité", colorClass: "color-dex", bgClass: "background-dex", borderClass: styles.borderDex },
    { key: "sagesse", label: "Sagesse", colorClass: "color-sag", bgClass: "background-sag", borderClass: styles.borderSag },
    { key: "constitution", label: "Constitution", colorClass: "color-con", bgClass: "background-con", borderClass: styles.borderCon },
    { key: "charisme", label: "Charisme", colorClass: "color-cha", bgClass: "background-cha", borderClass: styles.borderCha },
];

    // Fonction pour gérer le téléchargement de l'image
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crée une URL temporaire pour l'image
            setSelectedImage(imageUrl);
        }
    };

    const handleToggleArticle = (id) => {
        // Si l'article cliqué est déjà ouvert, fermez-le. Sinon, ouvrez-le.
        setOpenArticle(openArticle === id ? null : id);
    };

    const [stats, setStats] = useState({
        force: "",
        dexterite: "",
        constitution: "",
        intelligence: "",
        sagesse: "",
        charisme: "",
    });

    // Fonction pour limiter et mettre à jour la valeur de l'input
    const handleStatChange = (stat, value) => {
        let numericValue = parseInt(value, 10);

        // Limiter la valeur entre 0 et 18
        if (isNaN(numericValue) || numericValue < 0) numericValue = "";
        if (numericValue > 18) numericValue = 18;

        // Mettre à jour l'état
        setStats((prevStats) => ({
            ...prevStats,
            [stat]: numericValue, // Mettre à jour uniquement la statistique cible
        }));
    };

    // Fonction pour calculer l'indice
    const getIndice = (value) => {
        if (value >= 0 && value <= 2) return "6+";
        if (value >= 3 && value <= 5) return "5+";
        if (value >= 6 && value <= 10) return "4+";
        if (value >= 11 && value <= 15) return "3+";
        if (value >= 16 && value <= 18) return "2+";
        return ""; // Par défaut, rien
    };

    return (
        <>
            <section className={`flex flex-center`}>
                <h1 className={`${styles.textAlign}`}>Créez votre héro</h1>
            </section>
            <section className={`padding-section background-brown`}>
                <div className={`redirection`}>
                <button
                        className="flex flex-center flex-space-between color-white width100"
                        onClick={() => handleToggleArticle("article1")} // Identifiant unique
                    >
                        <h2>Information Principal</h2>
                        <span
                            className={`${styles.rotate} ${
                                openArticle === "article1" ? styles.rotateOpen : ""
                            }`}
                        >
                            ➤
                        </span>
                    </button>
                </div>
                <article className={`${openArticle === "article1" ? styles.articleOpen : ""} ${styles.article} flex flex-column gap-small`}>
                    <div className={`${styles.divInput} flex flex-center`}>
                        <img src="" alt="Pictogramme nom" className={`${styles.imgInput}`} />
                        <input type="text" placeholder="Nom du personnage" className={`${styles.input}`} />
                    </div>
                    <div className={`${styles.divInput} flex flex-center`}>
                        <img src="" alt="Pictogramme espece" className={`${styles.imgInput}`} />
                        <input type="text" placeholder="Espece" className={`${styles.input}`} />
                    </div>
                    <div className={`${styles.divInput} flex flex-center`}>
                        <img src="" alt="Pictogramme profil" className={`${styles.imgInput}`} />
                        <input type="text" placeholder="Profil" className={`${styles.input}`} />
                    </div>
                    <div className={`${styles.divInput} flex flex-center`}>
                        <img src="" alt="Pictogramme taille" className={`${styles.imgInput}`} />
                        <input type="text" placeholder="taille" className={`${styles.input}`} />
                    </div>
                    <div className={`flex flex-center`}>
                        <div className={`${styles.divInputSmall} flex flex-center`}>
                            <img src="" alt="Pictogramme genre" className={`${styles.imgInput}`} />
                            <input type="text" placeholder="genre" className={`${styles.input}`} />
                        </div>
                        <div className={`${styles.divInputSmall} flex flex-center`}>
                            <img src="" alt="Pictogramme xp" className={`${styles.imgInput}`} />
                            <input type="text" placeholder="xp" className={`${styles.input}`} />
                        </div>
                    </div>
                    {/* Champ de téléchargement d'image */}
                    <div className={`${styles.divInput} flex flex-column`}>
                        {/* Input de fichier caché */}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className={styles.inputFileHidden} 
                            id="fileInput"
                        />
                        {/* Bouton personnalisé pour déclencher l'input caché */}
                        <label htmlFor="fileInput" className={styles.uploadButton}>
                            Choisir une image
                        </label>
                        {/* Aperçu de l'image */}
                        {selectedImage && (
                            <div className={`${styles.imagePreview}`}>
                                <img src={selectedImage} alt="Aperçu de l'image" className={`${styles.previewImg}`} />
                            </div>
                        )}
                    </div>
                </article>
                <div className={`redirection`}>
                <button
                        className="flex flex-center flex-space-between color-white width100"
                        onClick={() => handleToggleArticle("article2")} // Identifiant unique
                    >
                        <h2>Caractéristiques</h2>
                        <span
                            className={`${styles.rotate} ${
                                openArticle === "article2" ? styles.rotateOpen : ""
                            }`}
                        >
                            ➤
                        </span>
                    </button>
                </div>
                <article className={`${openArticle === "article2" ? styles.articleOpen : ""} ${styles.article} flex flex-wrap padding-top`}>
                    {statsList.map(({ key, label, colorClass, bgClass, borderClass}) => (
                        <div
                            key={key}
                            className={`${styles.divInputSmall} ${styles.paddingBottom} flex flex-column-reverse flex-center`}
                        >
                            <div className={`flex flex-center relative`}>
                            {/* Input pour chaque caractéristique */}
                                <input
                                    type="number"
                                    placeholder="Valeur"
                                    className={`${styles.input} ${borderClass} ${styles.inputCarac}`}
                                    value={stats[key]}
                                    onChange={(e) => handleStatChange(key, e.target.value)}
                                />
                                {/* Span pour afficher l'indice */}
                                <span
                                    className={`${styles.imgInput} ${borderClass} ${styles.spanIndice} absolute flex flex-center`}
                                >
                                    {getIndice(stats[key])}
                                </span>
                            </div>
                            <div className={`flex flex-center relative ${styles.divInputSmall}`}>
                                <img
                                    src=""
                                    alt={`Pictogramme ${label}`}
                                    className={`${styles.imgInput} ${borderClass} absolute top-left0`}
                                />
                                <span
                                    className={`${styles.divInputSmall} ${styles.spanCarac} ${styles.textAlign} uppercase flex flex-center color-white ${bgClass}`}
                                >
                                    {label.slice(0, 3).toUpperCase()} {/* Affiche les 3 premières lettres */}
                                </span>
                            </div>
                            <span className={`${colorClass} uppercase`}>{label}</span>
                        </div>
                    ))}
                </article>
                <div className={`redirection`}>
                <button
                        className="flex flex-center flex-space-between color-white width100"
                        onClick={() => handleToggleArticle("article3")} // Identifiant unique
                    >
                        <h2>Talents</h2>
                        <span
                            className={`${styles.rotate} ${
                                openArticle === "article3" ? styles.rotateOpen : ""
                            }`}
                        >
                            ➤
                        </span>
                    </button>
                </div>
                <article className={`${openArticle === "article3" ? styles.articleOpen : ""} ${styles.article} flex flex-wrap padding-top`}>
                    
                </article>
            </section>
        </>  
    );
}