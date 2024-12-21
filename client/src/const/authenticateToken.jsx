export default async function authenticateToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Aucun token trouvé. Redirection nécessaire.");
    }

    try {
        const response = await fetch("http://localhost:5500/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType.includes("application/json")) {
            const errorText = await response.text();
            throw new Error(`Erreur du serveur : ${errorText}`);
        }

        const data = await response.json();
        return data; // Retourner les données utilisateur
    } catch (err) {
        throw new Error("Erreur réseau : " + err.message);
    }
}
