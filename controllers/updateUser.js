import query from '../database.js';
import xss from 'xss';

export default (req, res) => {
    const id = req.session.user.id;

    // On récupère le user à modifier depuis la BDD
    query(
        'SELECT id, role FROM User WHERE id = ?',
        [id],
        (error, results) => {
            // On vérifie s'il y a une erreur lors l'exécution de la requête
            if (error) {
                console.error(error);
                res.status(500).json({
                  error: 'Erreur serveur'
                });
                return;
            }
            
            // Si le user n'a pas été trouvé, on répond not found au client
            if (results.length === 0) {
                return res.status(404).send({
                  error: `L'utilisateur avec l'id ${id} n' pas été trouvé`
                });
            }

            // On créé le user à modifier, qui sera retourné au client
            const userToUpdate = {
                id,
                prename: xss(req.body.prename),
                name: xss(req.body.name),
                email: xss(req.body.email),
                age: xss(req.body.age),
                taille: xss(req.body.taille),
                poids: xss(req.body.poids),
                adresse: xss(req.body.adresse),
                choixformule: xss(req.body.choixformule),// !!! Important
                role: results[0].role
            }

            // On met à jour le user dans la BDD
            query(
                'UPDATE User SET  prename = ?, name = ?, email = ? , age = ? , taille = ? , poids = ? , adresse = ? ,choixformule = ?  WHERE id = ?',
                [userToUpdate.prename ,userToUpdate.name ,userToUpdate.email ,userToUpdate.age, userToUpdate.taille ,userToUpdate.poids  ,userToUpdate.adresse ,userToUpdate.choixformule , userToUpdate.id],
                (error) => {
                    // On vérifie s'il y a une erreur lors l'exécution de la requête
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                          error: 'Erreur serveur'
                        });
                        return;
                    }
                    
                    //On répond au client avec le user modifié
                    res.redirect('/')
                }
            )
        }
    )
};
