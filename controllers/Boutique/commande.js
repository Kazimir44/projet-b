import query from '../../database.js';

export default (req, res) => {
    query(
        'SELECT * FROM Produit', 
        (error, produits) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            // console.log(produits)
   res.render("commande.ejs", { produits }) 
})}