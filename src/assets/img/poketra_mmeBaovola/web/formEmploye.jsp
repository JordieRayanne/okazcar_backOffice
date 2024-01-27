<%@page import="model.Employe"%>
<%@page import="model.Matiere"%>
<%@page import="model.Look" %>
    <%@page import="java.util.List" %>   
    <%@ include file="header.jsp" %>
    <%
        List<Employe> emp = (List<Employe>)request.getAttribute("employes");
    %>
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
                <form action="FormEmploye" method="post">
                    <div class="mb-3">
                        <label for="check">Entrez votre nom: </label>
                        <input type="text"  name="nom">
                    </div>
                    <div class="mb-3">
                        <label for="check">Entrez votre prenom: </label>
                        <input type="text"  name="prenom">
                    </div>
                    <div class="mb-3">
                        <label for="check">Entrez votre date de naissance: </label>
                        <input type="date"  name="date">
                    </div>
                    <label for="dropdown" class="form-label">Choisir un sexe :</label>
                        <select id="dropdown" name="sexe" class="form-control">
                                <option value="femme">Femme</option>
                                <option value="homme">Homme</option>
                        </select>
                    <input type="submit" value="Valider" class="btn btn-primary">
                </form>
            </div>
        </div>
    </div>
    <!-- /.container-fluid -->

    <div class="search-container">
        <label for="search" class="form-label">Rechercher employe :</label>
        <input type="text" id="search" oninput="filterTable()" class="form-control mb-3">
    </div>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Sexe</th>
            </tr>
        </thead>
        <tbody>
            <% for(Employe ma : emp) { %>
                <tr>
                    <td><%= ma.getId() %></td>
                    <td><%= ma.getNom() %></td> 
                    <td><%= ma.getPrenom() %></td>
                    <td><%= ma.getSexe() %></td>
                </tr>
            <% } %>
        </tbody>
    </table>
</div>

<script>
    function filterTable() {
            // R�cup�rer la valeur de la zone de recherche
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("search");
            filter = input.value.toUpperCase();
            table = document.querySelector(".table");
            tr = table.getElementsByTagName("tr");

            // Parcourir toutes les lignes de la table et masquer celles qui ne correspondent pas � la recherche
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1]; // Vous pouvez changer l'index en fonction de la colonne que vous voulez filtrer
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
</script>


    <%@ include file="footer.jsp" %>

                            