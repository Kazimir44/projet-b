import query from '../../database.js';

export const getUtilisateur = (req, res) => {
    const userId = req.params.id;

    // Récupère les détails de l'utilisateur à partir de la base de données
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

            // Affiche la page de modification avec les détails de l'utilisateur
            res.render('adminModif.ejs', { user });
        }
    );
};

export const modifierUtilisateur = (req, res) => {
    const userId = req.params.id;
    const { prename, name, email, role, age, taille, poids, adresse, choixformule } = req.body;

    // Mets à jour les informations de l'utilisateur dans la base de données
    query(
        'UPDATE User SET prename = ?, name = ?, email = ?, role = ?, age = ?, taille = ?, poids = ?,  adresse = ?, choixformule = ? WHERE id = ?',
        [ prename, name, email, role, age, taille, poids, adresse, choixformule , userId],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            res.redirect('/compteAdmin'); // Redirige vers la liste des utilisateurs après la modification
        }
    );
};
