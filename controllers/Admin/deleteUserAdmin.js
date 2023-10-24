import query from '../../database.js';

export default (req, res) => {
    const userId = req.params.id;

    query(
        'DELETE FROM User WHERE id = ?', [userId],
        (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            res.redirect('/compteAdmin'); // Redirige vers la liste des utilisateurs après la suppression
        }
    );
};