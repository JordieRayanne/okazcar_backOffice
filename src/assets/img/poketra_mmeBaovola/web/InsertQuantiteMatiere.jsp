<%@page import="model.MatiereLook"%>
    <%@page import="java.util.List" %>
    <% 
        List<MatiereLook> looklist = (List<MatiereLook>)request.getAttribute("looks");
        int idproduit=(Integer)request.getAttribute("idproduit");
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
        margin-bottom: 15px; /* Ajoute un espace en bas de la liste d�roulante */
    }

    /* Style pour les cases � cocher */
    input[type="checkbox"] {
        margin-right: 5px; /* Ajoute un espace � droite des cases � cocher */
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
                <form action="ValidationQuantite" method="post">
                    <div class="mb-3">
                        <label for="dropdown" class="form-label">Choisir un matiere :</label>
                        <select id="dropdown" name="look" class="form-control" onchange="showQuantityField()">
                            <% for (MatiereLook look : looklist) { %>
                                <option value="<%= look.getIdmatiere() %>">
                                    <%= look.getMatiere() %>
                                </option>
                            <% } %>                                                  
                        </select>
                        <input type="hidden" value="<%=idproduit %>" name="produit">
                    </div>

                    <!-- Champ de quantite(initialement masque) -->
                    <div class="mb-3" id="quantityField" style="display: none;">
                        <label for="quantite" class="form-label">Quantite :</label>
                        <input type="number" id="quantite" name="quantite" class="form-control" required>
                    </div>

                    <!-- Champ de saisie pour l'unite -->
                    <div class="mb-3" id="uniteField" style="display: none;">
                        <label for="unite" class="form-label">Unite :</label>
                        <input type="text" id="unite" name="unite" class="form-control" required>
                    </div>

                    <input type="submit" value="Valider" class="btn btn-primary">
                </form>

                <script>
                    function showQuantityField() {
                        var dropdown = document.getElementById("dropdown");
                        var quantityField = document.getElementById("quantityField");
                        var uniteField = document.getElementById("uniteField");

                        // Affiche le champ de quantite et d'unite si un look est selectionne, sinon les masque
                        if (dropdown.value !== "") {
                            quantityField.style.display = "block";
                            uniteField.style.display = "block";
                        } else {
                            quantityField.style.display = "none";
                            uniteField.style.display = "none";
                        }
                    }

                    // Call the function once the page loads
                    document.addEventListener("DOMContentLoaded", showQuantityField);
                </script>

            </div>
        </div>
    </div>
    <!-- /.container-fluid -->

    </div>
    <!-- End of Main Content -->

    <%@ include file="footer.jsp" %>

                            