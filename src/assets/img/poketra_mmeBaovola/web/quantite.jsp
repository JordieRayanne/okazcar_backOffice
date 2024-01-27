<%@page import="model.Produit"%>
    <%@page import="java.util.List" %>
    <% 
        List<Produit> produits = (List<Produit>)request.getAttribute("produits");
    %>    
    <%@ include file="header.jsp" %>
    <style>
    /* Ajoutez ici vos styles CSS */
    .container-fluid {
        padding-top: 20px; /* Ajoute un espace en haut du conteneur */
    }

    /* Style pour le formulaire */
    form {
        max-width: 600px; /* D�finir une largeur maximale pour le formulaire */
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
                <form action="TraitementQuantite" method="post">
                    <div class="mb-3">
                        <label for="dropdown" class="form-label">Choisir un look :</label>
                        <select id="dropdown" name="produitLook" class="form-control">
                            <% for (Produit produit : produits) { %>
                                <option value="<%= produit.getLook() %>" data-data="<%= produit.getId() %>">
                            <%= produit.getNom() %>
                                </option>
                        <% } %>   
                        </select>
                        <input type="hidden" value="" id="idProduit" name="idProduit">
                    </div>
                    <input type="submit" value="Valider" class="btn btn-primary">
                </form>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->

    </div>
    <!-- End of Main Content -->

    <%@ include file="footer.jsp" %>

    <script src="template/js/node_modules/jquery/dist/jquery.min.js"></script>
<script>
    $(document).ready(function () {
        // Attach change event handler to the dropdown
        $("#dropdown").change(function () {
            // Get the selected option
            var selectedOption = $("#dropdown option:selected");

            // Get the value of the 'data-data' attribute
            var dataDataValue = selectedOption.data("data");

            // Update the value of the input field
            $("#idProduit").val(dataDataValue);
        });
        // Trigger the change event on page load
        $("#dropdown").trigger("change");
    });
</script>