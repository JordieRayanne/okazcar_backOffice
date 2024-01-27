<%@page import="model.Produit"%>

<%@page import="model.Look" %>
    <%@page import="java.util.List" %>   
    <% List<Produit> produits = (List<Produit>)request.getAttribute("produits");%>
    <%@ include file="header.jsp" %>
    <style>
    /* Ajoutez ici vos styles CSS */
    .container-fluid {
        padding-top: 20px; /* Ajoute un espace en haut du conteneur */
    }

    /* Style pour le formulaire */
    form {
        max-width: 600px; /* Définir une largeur maximale pour le formulaire */
        margin: 0 auto; /* Centrer le formulaire horizontalement */
    }

    /* Style pour la liste droulante */
    #dropdown {
        width: 100%; /* Utilisez la largeur maximale disponible */
        margin-bottom: 15px; /* Ajoute un espace en bas de la liste déroulante */
    }

    /* Style pour les cases à cocher */
    input[type="checkbox"] {
        margin-right: 5px; /* Ajoute un espace à droite des cases à cocher */
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
                <form action="CreateProduit" method="post">
                    <label for="dropdown" class="form-label">Choisir un look :</label>
                        <select id="dropdown" name="id_produit" class="form-control">
                            <% for (Produit produit : produits) { %>
                                <option value="<%= produit.getId() %>" data-data="<%= produit.getId() %>">
                            <%= produit.getNom() %>
                                </option>
                        <% } %>   
                        </select>
                        
                    <label for="check">entrez nombre: </label>
                    <input type="number"  name="quantite_produit">
                    
                    <input type="submit" value="Valider" class="btn btn-primary">
                </form>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->

    </div>
    <!-- End of Main Content -->

    <%@ include file="footer.jsp" %>

                            