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
            adresse: req.body.adresse,
            password: hash,
            role: 'admin'
        }
        query(
            'INSERT INTO User (id,prename,name, email, age, adresse, password, role) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.id, user.prename, user.name, user.email, user.age, user.adresse, user.password, user.role],
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
