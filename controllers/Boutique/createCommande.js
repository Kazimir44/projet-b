import { v4 } from 'uuid';
import query from '../../database.js';
import xss from 'xss';

export default (req, res) => {
  const idUser = req.session.user.id
  const idCommande = v4();
  query(
    `INSERT INTO Commande (id, userId) VALUES (?, ?)`, [idCommande, idUser],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la requête');
        return;
      }
      const promises = req.body.produit.map((pdtCde, index) => {
        const produit = {
          idProduit: xss(req.body.produit[index]),
          taille: xss(req.body.taille[index]),
          quantite: xss(req.body.quantite[index]),
        }
        return new Promise((resolve, reject) => {
          const idProduitCommande= v4();
          query(
            `INSERT INTO ProduitCommande (id, produitId, taille, quantite, prix, commandeId) 
SELECT ?, Produit.id, ?, ?, Produit.prix, ? 
FROM Produit 
WHERE id = ?`, [idProduitCommande, produit.taille, produit.quantite, idCommande, produit.idProduit],
            (error, result) => {
              if (error) {
                console.error(error);
                reject(error);
                return;
              }
              resolve();
            });
        });
      });

      Promise.all(promises).then(() => {
          res.status(200).redirect('/');
        })
        .catch((error) => {
          res.status(500).send('Erreur lors de la requête');
        });
    }
  )
};


