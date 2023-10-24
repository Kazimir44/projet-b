import query from '../../database.js';

export default (req, res) => {
    const userId = req.session.user.id;
    
    query(
        'SELECT * FROM User WHERE id = ?', [userId],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (results.length === 0) {
                res.status(404).send('Utilisateur non trouvé');
                return;
            }

            const user = results[0]; // Récupère le premier résultat (supposons qu'il n'y ait qu'un utilisateur avec cet ID)

            // Passe les informations de l'utilisateur à la vue
            res.render('compteUser.ejs', { user });
        }
    );
};
