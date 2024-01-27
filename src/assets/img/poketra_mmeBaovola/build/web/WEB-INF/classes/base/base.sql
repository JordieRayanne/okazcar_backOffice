-- CREATE DATABASE poketra;
-- \c poketra;

CREATE TABLE matiere (
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255) NOT NULL,
    prix numeric(10,2) 
);

CREATE TABLE look (
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255) NOT NULL
);

CREATE TABLE matiere_look (
    id SERIAL PRIMARY KEY,
    id_look INT REFERENCES look(id),
    id_matiere INT REFERENCES matiere(id),
    UNIQUE (id_look, id_matiere)
);

-- -------19/12/23
CREATE TABLE article(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE table produit(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    id_article int REFERENCES article(id),
    id_look  INT REFERENCES look(id),
    id_taille int REFERENCES taille(id),
    id_type int REFERENCES type(id)
);

-- M,L,XL...
CREATE TABLE taille(
    id SERIAL PRIMARY KEY,
    longueur numeric(10,2),
    largeur decimal(10,2),
    hauteur decimal(10,2),
    designation VARCHAR(10),
    UNIQUE (longueur, largeur, hauteur, designation)
);

CREATE table type(
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255) UNIQUE
);
    
CREATE table prix_produit(
    id SERIAL PRIMARY KEY,
    id_produit int REFERENCES produit(id),
    prix numeric(10,2)
);

CREATE TABLE duree_fabrication (
    id SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id),
    date_debut TIMESTAMP,
    date_fin TIMESTAMP
);

CREATE TABLE quantite_matiere (
    id SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id),
    id_matiere INT REFERENCES matiere(id),
    quantite numeric(8,4),
    unite VARCHAR(50) 
);

-- stock
CREATE TABLE stock_matiere_premiere(
    id SERIAL PRIMARY KEY,
    id_matiere INT REFERENCES matiere(id),
    nombre_stock numeric(10,2)
);
___________________________________________________________________________________
CREATE TABLE employe (
    id SERIAL PRIMARY KEY,
    nom varchar(40),
    prenom varchar(100),
    date_naissance date,
    sexe varchar(10)
);
CREATE TABLE fonction(
    id SERIAL PRIMARY KEY,
    fonction VARCHAR(150)
);
CREATE TABLE employe_fonction(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employe(id), 
    salaire_par_heure numeric
);
CREATE TABLE produit_fabrication_employe(
    id SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id),
    id_employe INT REFERENCES employe(id),
    id_fonction INT REFERENCES fonction(id),
    heure_travail numeric(10,2),
    salaire_par_heure numeric(10,2),
    salaire_totale numeric(10,2)
);

CREATE TABLE produit_prix(
    id SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id), 
    prix_vente numeric(10,2)
);

INSERT INTO employe (nom, prenom, date_naissance, sexe) VALUES
    ('Dupont', 'Jean', '1990-05-15', 'Homme'),
    ('Martin', 'Marie', '1985-12-10', 'Femme'),
    ('Lefevre', 'Pierre', '1988-08-25', 'Homme'),
    ('Dubois', 'Sophie', '1995-03-02', 'Femme');
INSERT INTO fonction (fonction) VALUES
    ('Développeur'),
    ('Responsable des ventes'),
    ('Analyste financier'),
    ('Chef de projet');
INSERT INTO employe_fonction (id_employe, salaire_par_heure) VALUES
    (1, 25.50),
    (2, 30.75),
    (3, 28.00),
    (4, 26.25);
INSERT INTO produit_fabrication_employe (id_produit, id_employe, id_fonction, heure_travail, salaire_par_heure, salaire_totale) VALUES
    (1, 1, 1, 40, 25.50, 1020.00),
    (2, 2, 2, 35, 30.75, 1076.25),
    (3, 3, 3, 45, 28.00, 1260.00),
    (4, 4, 4, 50, 26.25, 1312.50);
