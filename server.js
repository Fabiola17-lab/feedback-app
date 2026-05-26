const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Code sécurisé : ne plante pas si les clés sont absentes
const endpoint = process.env.COSMOS_ENDPOINT || "";
const key = process.env.COSMOS_KEY || "";
let container = null;

if (endpoint && key) {
    const client = new CosmosClient({ endpoint, key });
    container = client.database("feedback").container("messages");
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/feedback', async (req, res) => {
    const { email, message } = req.body;
    if (container) {
        await container.items.create({ id: Date.now().toString(), email, message });
        res.send("<h1>✅ Succès ! Message enregistré dans Cosmos DB.</h1><a href='/'>Retour</a>");
    } else {
        res.send("<h1>⚠️ Erreur : Connexion Cosmos DB non configurée.</h1><a href='/'>Retour</a>");
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Serveur prêt sur le port ${port}`));
