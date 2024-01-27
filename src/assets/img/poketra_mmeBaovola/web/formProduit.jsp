<%@page import="model.Article"%>
<%@page import="model.Look" %>
<%@page import="model.Taille" %>
<%@page import="model.Type" %>

    <%@page import="java.util.List" %>
    <% 
        List<Article> articles = (List<Article>)request.getAttribute("articles");
        List<Look> looks = (List<Look>)request.getAttribute("looks");
        List<Taille> tailles = (List<Taille>)request.getAttribute("tailles");
        List<Type> types=(List<Type>)request.getAttribute("types");
    %>    
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

    /* Style pour la liste déroulante */
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
                <form action="TraitementInserti onMatiereLook" method="post">
                    <div class="mb-3">
                        <label for="dropdown" class="form-label">Choisir un article :</label>
                        <select id="dropdown" name="article" class="form-control">
                        <% for (Article article : articles) { %>
                                <option value="<%= article.getId() %>">
                                    <%= article.getNom() %>
                                </option>
                        <% } %>                                                  
                        </select>

                        <label for="dropdown" class="form-label">Description du produit :</label>
                        <input type="text" name="nom">

                        <label for="dropdown" class="form-label">Choisir un look :</label>
                        <select id="dropdown" name="look" class="form-control">
                        <% for (Look look : looks) { %>
                                <option value="<%= look.getId() %>">
                                    <%= look.getDesignation() %>
                                </option>
                        <% } %>                                                  
                        </select>
                        
                        <label for="dropdown" class="form-label">Choisir un taille :</label>
                        <select id="dropdown" name="tailles" class="form-control">
                        <% for (Taille taille : tailles) { %>
                                <option value="<%= taille.getId() %>">
                                    <%= taille.getDesignation() %>
                                </option>
                        <% } %>                                                  
                        </select>
                        <label for="dropdown" class="form-label">Choisir un type :</label>
                        <select id="dropdown" name="type" class="form-control">
                        <% for (Type type : types) { %>
                                <option value="<%= type.getId() %>">
                                    <%= type.getDesignation() %>
                                </option>
                        <% } %>                                                  
                        </select>                        
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

                            