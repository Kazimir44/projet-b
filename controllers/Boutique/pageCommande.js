// export default (req, res) => {
//   res.render("pageCommande.ejs") 
// }

import query from '../../database.js';

export default (req, res) => {
    const idUser = req.params.idUser;
    query(
        `SELECT P.name as productName,
                PC.id as idProduitCommande,
                PC.taille,
                PC.quantite
           FROM Commande as C
                INNER JOIN ProduitCommande as PC ON C.id = PC.commandeId
                INNER JOIN Produit as P ON PC.produitId = P.id
                INNER JOIN User as U ON U.id = C.userId
          WHERE C.userId = ?`,
        [idUser],
        (error, commandes) => {
            if(error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            console.log(commandes);
            res.render('pageCommande.ejs',{commandes});
        }
    );
};