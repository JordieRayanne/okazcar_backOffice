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
-- (ouvrier,senior,expert)
CREATE TABLE fonction(
    id SERIAL PRIMARY KEY,
    fonction VARCHAR(150)
);

CREATE TABLE fonction_salaire(
    id SERIAL PRIMARY KEY,
    id_fonction INT REFERENCES fonction(id), 
    taux_horaire numeric
);

CREATE table embauche_employe(
    id SERIAL PRIMARY KEY,
    date_embauche TIMESTAMP,
    id_employe int REFERENCES employe(id),
    id_fonction int REFERENCES fonction(id)
);

INSERT INTO fonction (fonction)
VALUES
    ('Ouvrier'),
    ('Senior'),
    ('Expert');

INSERT INTO fonction_salaire (id_fonction, taux_horaire)
VALUES
    (1, 15.00),  -- Ouvrier
    (2, 30.00),  -- Senior
    (3, 60.00); -- Expert

INSERT INTO employe (nom, prenom, date_naissance, sexe)
VALUES
    ('Doe', 'John', '1990-01-15', 'M'),
    ('Smith', 'Alice', '1985-05-20', 'F'),
    ('Johnson', 'Bob', '1993-11-08', 'M'),
    ('Brown', 'Emma', '1988-07-10', 'F'),
    ('Miller', 'David', '1995-03-22', 'M');

INSERT INTO embauche_employe (date_embauche, id_employe, id_fonction)
VALUES
    ('2022-01-01', 1, 1),  -- John Doe est embauché comme Ouvrier
    ('2021-05-15', 2, 2),  -- Alice Smith est embauchée comme Senior
    ('2023-03-10', 3, 3),  -- Bob Johnson est embauché comme Expert
    ('2020-08-18', 4, 1),  -- Emma Brown est embauchée comme Manager
    ('2022-11-05', 5, 2);  -- David Miller est embauché comme Technicien

CREATE TABLE historique_employe (
    id SERIAL PRIMARY KEY,
    date_evenement TIMESTAMP,
    id_employe INT REFERENCES employe(id),
    id_fonction INT REFERENCES fonction(id)
);


CREATE OR REPLACE VIEW vw_employe_details AS
SELECT
    e.id AS employe_id,
    e.nom AS nom,
    e.prenom AS prenom,
    e.date_naissance AS date_naissance,
    e.sexe AS sexe,
    ee.id_fonction AS fonction_id,
    f.fonction AS fonction,
    fs.taux_horaire AS taux_horaire,
    ee.date_embauche AS date_embauche
FROM
    employe e
JOIN
    embauche_employe ee ON e.id = ee.id_employe
JOIN
    fonction_salaire fs ON ee.id_fonction = fs.id_fonction
JOIN
    fonction f ON fs.id_fonction = f.id;



_______________________________________________________________
CREATE TABLE produit_fabrication_employe(
    id SERIAL PRIMARY KEY,
    id_produit INT REFERENCES produit(id),
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


CREATE table client(
    id serial primary key,
    nom varchar(255),
    date_naissance date,
    genre varchar(50)
);

CREATE table vente(
    id serial primary key,
    date_evenement TIMESTAMP,
    id_client REFERENCES client(id),
    id_produit REFERENCES produit(id),
    nombre numeric
);
