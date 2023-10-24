import query from '../../database.js';
import xss from 'xss';

/*** AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateCommande(req, res) {
    let id = req.params.id;

    query(
        `SELECT 
                P.name as productName,
                PC.id as idProduitCommande,
                PC.taille,
                PC.quantite
        FROM ProduitCommande PC 
        INNER JOIN Produit as P ON PC.produitId = P.id
        WHERE  PC.id = ?`, [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }

            // Supprimez les variables titreFormulaire et titreCreationCompte si vous n'en avez pas besoin

            // on appelle le template inscription en lui passant les informations concernant le user
            res.render('modifCommande.ejs', {
                action: `/commande/update/${id}`,
                produitCommande : results[0] 
            });
        }
    );
};

export function updateCommandeSubmit(req, res) {
    let idProduitCommande = req.params.id;

    query(`UPDATE ProduitCommande SET taille = ?,
                                   quantite = ?
            WHERE id = ?`,
        [xss(req.body.taille), 
        xss(req.body.quantite), 
        idProduitCommande],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requête');
                return;
            }
            // on redirige vers la page admin
            res.redirect('/compteAdmin');
        }
    );
};
