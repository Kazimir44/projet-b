import query from '../../database.js';

/****SUPPRESSION DE CONTACT */
export default (req, res) => {
    const supp = [req.session.user.id]
  req.session.destroy(() => {
        query(
        `DELETE FROM User WHERE id = ?`,
        supp,
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            //on redirige vers la page d'accueil
            res.redirect('/');
        }
    );
    })
    
    
};
