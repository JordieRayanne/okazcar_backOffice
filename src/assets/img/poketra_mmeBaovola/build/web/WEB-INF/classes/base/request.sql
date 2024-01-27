-- Créer une vue pour la jointure entre matiere, look et matiere_look
CREATE VIEW matiere_look_vw AS
SELECT
    ml.id AS matiere_look_id,
    m.id AS matiere_id,
    m.designation AS matiere_designation,é
    l.id AS look_id,
    l.designation AS look_designation
FROM
    matiere_look ml
JOIN
    matiere m ON ml.id_matiere = m.id
JOIN
    look l ON ml.id_look = l.id;

create or replace view as info_prix 
select * from produit 
join quantite_matiere on produit.id = quantite_matiere.id_produit 
join look on produit.id_look = look.id 
join matiere on quantite_matiere.id_matiere = matiere.id;

create or replace view rel_produit_matiere as
select 
nom , id_article , id_look , id_taille , id_type , produit.id as id_produit, id_matiere , quantite , unite , designation 
from produit join quantite_matiere 
on produit.id = quantite_matiere.id_produit 
join matiere on quantite_matiere.id_matiere = matiere.id;

create or replace view rel_matiere_stock as 
select id_matiere , nombre_stock , prix , designation 
from matiere join stock_matiere_premiere on matiere.id = stock_matiere_premiere.id_matiere;


