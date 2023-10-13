import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './router.js';
import session from 'express-session';

const app = express();


app.use(session({
	secret: '25b77113-bf23-4cee-9eb7-7bf01555c0f8',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}));

const PORT = process.env.PORT;


//pour récupérer les informations du formulaire
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 


app.use(express.static('public'));
//importation des routes
app.use('/', router);

// connexion du serveur au réseau
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
