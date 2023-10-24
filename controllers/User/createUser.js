import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import query from '../../database.js';

export default (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        
        const user = {
            id: v4(),
            prename: req.body.prename,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            taille: req.body.taille,
            poids: req.body.poids,
            adresse: req.body.adresse,
            choixformule: req.body.choixformule,
            password: hash,
            role: 'boxeur'
        }
        query(
            'INSERT INTO User (id,prename,name, email, age, taille, poids, adresse, choixformule, password, role) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.id, user.prename, user.name, user.email, user.age, user.taille, user.poids, user.adresse, user.choixformule, user.password, user.role],
            (error, result) => { 
                if(error) {
                    console.error(error);
                    res.status(500).json({
                        error: 'Erreur server'
                    });
                    return;
                }
                res.redirect('/submitted');
                
            }
        );
    });
}
