res.send(`
    <html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>body { background-color: #f4f7f6; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }</style>
    </head>
    <body>
        <div class="text-center p-5 shadow rounded bg-white">
            <h1 class="text-success">✅ Merci !</h1>
            <p>Votre feedback a été enregistré avec succès dans Cosmos DB.</p>
            <a href="/" class="btn btn-outline-primary">Envoyer un autre message</a>
        </div>
    </body>
    </html>
`);
