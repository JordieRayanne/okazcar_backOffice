<%@page import="model.Employe"%>
<%@page import="model.Article"%>
    <%@page import="java.util.List" %>
    <% 
        List<Article> articles = (List<Article>)request.getAttribute("articles");
        List<Employe> employes = (List<Employe>)request.getAttribute("employes");
    %>    
    <%@ include file="header.jsp" %>
    <style>
    /* Ajoutez ici vos styles CSS */
    .container-fluid {
        padding-top: 20px; /* Ajoute un espace en haut du conteneur */
    }

    /* Style pour le formulaire */
    form {
        max-width: 600px; /* Definir une largeur maximale pour le formulaire */
        margin: 0 auto; /* Centrer le formulaire horizontalement */
    }

    /* Style pour la liste deroulante */
    #dropdown {
        width: 100%; /* Utilisez la largeur maximale disponible */
        margin-bottom: 15px; /* Ajoute un espace en bas de la liste dï¿½roulante */
    }

    /* Style pour les cases ï¿½ cocher */
    input[type="checkbox"] {
        margin-right: 5px; /* Ajoute un espace ï¿½ droite des cases ï¿½ cocher */
    }

    /* Style pour le bouton Valider */
    .btn-primary {
        background-color: #007bff; /* Couleur de fond bleue pour le bouton principal */
        color: #fff; /* Couleur du texte blanc */
    }
</style>

    <!-- Begin Page Content -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"></h1>

        </div>

        <!-- Content Row -->
        <div class="row">

        </div>

        <!-- Content Row -->
<div class="row">
    <!-- Area Chart -->
    <div class="col-xl-8 col-lg-7">
        <form action="fabrication_produit_employe" method="get">
            <div class="mb-3">
                <label for="dropdown" class="form-label">Choisir un article :</label>
                <select id="matiereDropdown" name="id_article" class="form-control" onchange="showQuantityField('matiere')">
                    <% for (Article ar : articles) { %>
                        <option value="<%= ar.getId() %>">
                            <%= ar.getNom() %>
                        </option>
                    <% } %>                                                  
                </select>
            </div>

            <!-- Champ de quantité initialement masqué -->
            <div class="mb-3" id="matiereQuantityField" style="display: none;">
                <label for="employeDropdown" class="form-label">Choisir un employé :</label>
                <select id="employeDropdown" name="id_employe" class="form-control">
                    <% for (Employe e : employes) { %>
                        <option value="<%= e.getId() %>">
                            <%= e.getNom() %>
                        </option>
                    <% } %>                                                  
                </select>
                
                <div class="mb-3">
                    <label for="heureTravail" class="form-label">Heure de travail :</label>
                    <input type="number" name="heure_travail">
                </div>
                <div class="mb-3">
                    <label for="salaire" class="form-label">Salaire :</label>
                    <input type="number" name="salaireParHeure">
                </div>
            </div>

            <!-- Bouton "Add" pour ajouter dynamiquement le champ -->
            <button type="button" onclick="addEmployeeField()">Add</button>

            <input type="submit" value="Valider" class="btn btn-primary">
        </form>

        <script>
            function showQuantityField(prefix) {
                var dropdown = document.getElementById(prefix + "Dropdown");
                var quantityField = document.getElementById(prefix + "QuantityField");

                // Affiche le champ de quantité et d'unite si un look est sélectionné, sinon les masque
                if (dropdown.value !== "") {
                    quantityField.style.display = "block";
                } else {
                    quantityField.style.display = "none";
                }
            }

            function addEmployeeField() {
                // Clonez le champ existant
                var clone = document.getElementById("matiereQuantityField").cloneNode(true);
                
                // Modifiez les ID pour les rendre uniques
                clone.id = "employeeQuantityField_" + Math.floor(Math.random() * 1000);
                clone.querySelector("select").id = "employeeDropdown_" + Math.floor(Math.random() * 1000);
                clone.querySelector("input").name = "heure_travail_" + Math.floor(Math.random() * 1000);

                // Ajoutez le champ cloné à la fin du formulaire
                document.querySelector("form").appendChild(clone);
            }

            // Appeler la fonction une fois que la page est chargée
            document.addEventListener("DOMContentLoaded", function() {
                showQuantityField('matiere');
            });
        </script>
    </div>
</div>


    </div>
    <!-- End of Main Content -->

    <%@ include file="footer.jsp" %>

                            