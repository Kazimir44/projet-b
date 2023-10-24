import query from '../../database.js';

/****SUPPRESSION DE COMMANDE */
export default (req, res) => {
    const commandeToDelete = req.body.commandeToDelete;
    
    query(
        `DELETE FROM ProduitCommande WHERE id IN(?)`,
        [commandeToDelete],
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            //on redirige vers la page d'accueil
            res.redirect('/pageCommande.ejs');
        }
    );
};