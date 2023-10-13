import express from "express";

const router = express.Router();

import HomeController from "./controllers/home.js";
import createUser from './controllers/User/createUser.js';
import updateUser from './controllers/updateUser.js';
import Connexion from './controllers/User/login.js';
import Deconnexion from './controllers/User/logout.js';
import Contact from './controllers/User/contactForm.js';
import Histoire from './controllers/Histoire.js';
import Supprimer from './controllers/User/deleteUser.js';
import compteUser from './controllers/User/compteUser.js';
import submitted from './controllers/User/submitted.js';


router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});

router.get('/', HomeController);

router.get('/createUser', (req, res) => {
    res.render('createUser.ejs');
});
router.post('/createUser', createUser);

router.get('/compteUser', compteUser);

router.get('/submitted', submitted);

router.get('/deleteUser', Supprimer);

router.get('/contactForm', Contact);

router.get('/Histoire', Histoire);

router.get('/logout', Deconnexion);

router.put('/users/:id', updateUser);

router.post('/login', Connexion);

router.get('/login', (req, res) => {
  res.render('login.ejs');
});


export default router;
