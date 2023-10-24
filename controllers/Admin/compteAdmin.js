import query from '../../database.js';

export default (req, res) => {
    // Vérifie si l'utilisateur a le rôle "admin"
    if (req.session.user.role === 'admin') {
        // Exécute la requête pour récupérer tous les utilisateurs
        query(
            'SELECT * FROM User',
            (error, results) => {
                if (error) {
                    console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                    res.status(500).send('Erreur serveur');
                    return;
                }

                // Envoie les résultats à la vue
                res.render('compteAdmin.ejs', { users: results });
            }
        );
    } else {
        // Si l'utilisateur n'a pas le rôle "admin", renvoie une erreur 403 (accès refusé)
        res.status(403).send('Accès refusé');
    }
};
