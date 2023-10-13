import fs from "fs";
import csv from "csv";

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateContact(req, res) {
    let id = req.params.id;

    fs.readFile('liste.csv', (err, data) => {
        //si il y a une erreur on l'affiche
        if (err) {
            console.log(err);
            return res.status(500).send('Une erreur s\'est produite');
        }
        csv.parse(data, {columns: true, trim: true}, (err, contacts) => {
            //si il y a une erreur on l'affiche
            if (err) {
                console.log(err);
                return res.status(500).send('Une erreur s\'est produite');
            }

            // recherche le contact dans la collection
            const contact = contacts.find((contact) => contact.id === id);
            if (!contact) {
                return res.status(404).send(`Contact with id ${id} not found`);
            }

            //on appelle le template contactForm en lui passant les informations concernant le contact
            res.render('contactForm', {
                title: 'Modification d\'un contact',
                action: `/contacts/${id}/update`,
                id:id,
                contact
            });
        });
    });
};

export function updateContactSubmit(req, res) {
    let id = req.params.id;

    fs.readFile('liste.csv', (err, data) => {
        //si il y a une erreur on l'affiche
        if (err) {
            console.log(err);
            return res.status(500).send('Une erreur s\'est produite');
        }

        //sinon, on parse le fichier pour le transformer en tableau
        csv.parse(data, {columns: true, trim: true}, (err, contacts) => {
            //si il y a une erreur on l'affiche
            if (err) {
                console.log(err);
                return res.status(500).send('Une erreur s\'est produite');
            }
            //on récupère les données transmises par le formulaire
            let contactData = {
                id,
                ...req.body
            };

            // recherche l'index (position) du contact dans la collection
            const contactIndex = contacts.findIndex((contact) => contact.id === id);
            if (!contactIndex) {
                return res.status(404).send(`Contact with id ${id} not found`);
            }

            //on modifie le contact 
            contacts[contactIndex] = contactData;

            //on transforme à nouveau le tableau en csv
            csv.stringify(contacts, { header: true }, (err, contacts) => {
                //si il y a une erreur on l'affiche
                if (err) {
                    console.log(err);
                    return res.status(500).send('Une erreur s\'est produite');
                }

                //on écrit le fichier pour modifier son contenu
                fs.writeFile('liste.csv', contacts, (err) => {
                    //si il y a une erreur on l'affiche
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Une erreur s\'est produite');
                    }

                    //on redirige vers la page d'accueil
                    res.redirect('/');
                });
            });
        });
    });  
};
