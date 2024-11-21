import styles from "../modules/PagePersonnage.module.css";

// Liste des caractéristiques
export const statsList = [
    { key: "force", label: "Force", colorClass: "color-for", bgClass: "background-for", borderClass: styles.borderFor },
    { key: "intelligence", label: "Intelligence", colorClass: "color-int", bgClass: "background-int", borderClass: styles.borderInt },
    { key: "dexterite", label: "Dextérité", colorClass: "color-dex", bgClass: "background-dex", borderClass: styles.borderDex },
    { key: "sagesse", label: "Sagesse", colorClass: "color-sag", bgClass: "background-sag", borderClass: styles.borderSag },
    { key: "constitution", label: "Constitution", colorClass: "color-con", bgClass: "background-con", borderClass: styles.borderCon },
    { key: "charisme", label: "Charisme", colorClass: "color-cha", bgClass: "background-cha", borderClass: styles.borderCha },
];

// Liste des talents
export const talents = {
    force: ["Athlétisme"],
    dexterite: ["Acrobatie", "Arts manuels", "Discrétion", "Équitation", "Habilité"],
    constitution: ["Endurance"],
    intelligence: ["Arcane", "Artisanat", "Bricolage", "Chimie", "Connaissance", "Identification", "Investigation", "Médecine", "Nature", "Navigation", "Orientation", "Religion"],
    sagesse: ["Calme", "Discernement", "Perception", "Survie"],
    charisme: ["Charme", "Commandement", "Domptage", "Intimidation", "Performance"]
};