-- Ajouter des données à la table "matiere"
INSERT INTO matiere (designation) VALUES
    ('Coton'),
    ('Cuir'),
    ('Toile'),
    ('Daim');

-- Ajouter des données à la table "look"
INSERT INTO look (designation) VALUES
    ('Vintage'),
    ('Moderne'),
    ('Classique'),
    ('Boheme');

--     update look set designation='Boheme' where id=4;

-- Ajouter des données à la table "matiere_look"
INSERT INTO matiere_look (id_matiere, id_look) VALUES
    (1, 2),  -- Coton avec look Moderne
    (2, 3),  -- Cuir avec look Classique
    (3, 1),  -- Toile avec look Vintage
    (4, 4);  -- Daim avec look Bohème


--------19/12/23
-- Ajouter des articles (sacs)
INSERT INTO article (nom) VALUES
    ('Sac a Main'),
    ('Cabas Vintage'),
    ('Sac Moderne');

-- Ajouter des tailles
INSERT INTO taille (longueur, largeur, hauteur, designation) VALUES
    (30.0, 20.0, 10.0, 'M'),
    (35.0, 25.0, 12.0, 'L'),
    (40.0, 30.0, 15.0, 'XL');

-- Ajouter des types
INSERT INTO type (designation) VALUES
    ('Cabas'),
    ('Sac a Main'),
    ('Pochette'),
    ('Sac de voyage'),
    ('Portefeuille'),
    ('Sac bandouliere');

-- Ajouter des produits
INSERT INTO produit (nom, id_article, id_look, id_taille, id_type) VALUES
    ('Sac à Main Vintage M', 1, 1, 1, 2),
    ('Cabas Classique L', 2, 3, 2, 1),
    ('Sac Moderne XL', 3, 2, 3, 3);


-- Ajouter des prix pour les produits
INSERT INTO prix_produit (id_produit, prix) VALUES
    (1, 15000.00),
    (2, 8000.00),
    (3, 12000.00);

-- Ajouter une durée de fabrication pour un produit
INSERT INTO duree_fabrication (id_produit, date_debut, date_fin) VALUES
    (1, '2023-01-01 08:00:00', '2023-01-05 15:30:00');
                                                                                      
-- Ajouter des quantités de matières utilisées dans les produits
INSERT INTO quantite_matiere (id_produit, id_matiere, quantite, unite) VALUES
    (1, 1, 2.5, 'kg'), -- 2.5 mètres carrés de Cuir pour le Sac à Main Luxe
    (2, 2, 1.8, 'kg'), -- 1.8 mètres carrés de Toile pour le Cabas Vintage
    (3, 3, 3.0, 'kg'); -- 3.0 kilogrammes de Plastique pour le Sac Moderne

INSERT INTO stock_matiere_premiere (id_matiere, nombre_stock) VALUES
    (1, 10),
    (2, 5),
    (3, 15);

