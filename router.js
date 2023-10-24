import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import createUser from './controllers/User/createUser.js';
import updateUser from './controllers/updateUser.js';
import Connexion from './controllers/User/login.js';
import Deconnexion from './controllers/User/logout.js';
import Contact from './controllers/User/contactForm.js';

import Histoire from './controllers/Histoire.js';
import Entraineur from './controllers/Entraineur.js';
import Evenement from './controllers/Evenement.js';

import Supprimer from './controllers/User/deleteUser.js';
import compteUser from './controllers/User/compteUser.js';
import submitted from './controllers/User/submitted.js';
import compteAdmin from './controllers/Admin/compteAdmin.js';
import deleteUserAdmin from './controllers/Admin/deleteUserAdmin.js';
import { getUtilisateur, modifierUtilisateur } from './controllers/Admin/modifierUser.js';

import createCommande  from "./controllers/Boutique/createCommande.js";
import deleteCommande from './controllers/Boutique/deleteCommande.js';
import {updateCommande, updateCommandeSubmit}  from './controllers/Boutique/updateCommande.js'
import pagecommande from "./controllers/Boutique/pageCommande.js";
import commande from "./controllers/Boutique/commande.js";


router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    res.locals.user = req.session.user;
    next();
});

const checkAuthentication = (req, res, next) => {
    if(!req.session.isLogged) {
        res.redirect('/');
        return;
    }
    next();
}


router.get('/deleteUserAdmin/:id',checkAuthentication, deleteUserAdmin )
    


router.get('/modifierUser/:id', checkAuthentication, getUtilisateur);
router.post('/modifierUser/:id', checkAuthentication, modifierUtilisateur);



router.get('/', HomeController);

router.get('/createUser', (req, res) => {
    res.render('createUser.ejs');
});
router.post('/createUser', createUser);

router.get('/compteUser', checkAuthentication, compteUser);

router.get('/compteAdmin', checkAuthentication, compteAdmin);

router.get('/submitted', checkAuthentication, submitted);

router.get('/deleteUser', checkAuthentication, Supprimer);

router.get('/contactForm', Contact);

router.get('/Histoire', Histoire);
router.get('/Entraineur', Entraineur);
router.get('/Evenement', Evenement);

router.get('/logout', checkAuthentication, Deconnexion);

router.post('/updateUser', checkAuthentication,updateUser)

router.put('/users/:id', checkAuthentication, updateUser);

router.post('/login', Connexion);

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.get('/commande/update/:id',checkAuthentication, updateCommande);
router.post('/commande/update/:id',checkAuthentication, updateCommandeSubmit);

router.get('/pageCommande/user/:idUser',checkAuthentication, pagecommande);
router.get('/commande', checkAuthentication,commande);
router.post('/commande' ,checkAuthentication, createCommande);
router.post('/commande/delete',checkAuthentication, deleteCommande)

export default router;
