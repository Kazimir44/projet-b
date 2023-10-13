import query from '../../database.js';
import bcrypt from 'bcrypt';

export default (req, res) => {
    const { prename ,name, password } = req.body;

    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE prename = ? AND name = ? ', [prename,name],
        (error, results) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            // Si le user n'a pas été trouvé, on répond au client
            if (results.length === 0) {
                res.status(400).send('Identifiants incorrects');
                return;
            }

            bcrypt.compare(password, results[0].password, (error, isAllowed) => {
                // Gestion de l'erreur
                if (error) {
                    console.error(`Erreur de hash : ${error}`);
                    res.status(500).send('Erreur serveur');
                    return;
                }

                if (isAllowed) {
                    req.session.isLogged = true;
                    req.session.user = {
                        id: results[0].id,
                        prename: results[0].prename,
                        name: results[0].name,
                        password: results[0].password,
                        role: results[0].role
                    };
                    console.log(req.session);
                    res.redirect('/');
                }
                else {
                    res.status(400).send('Identifiants incorrects');
                }
            });
        }
    );
}
