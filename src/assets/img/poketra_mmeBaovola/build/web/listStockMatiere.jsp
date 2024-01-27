
<%@page import="model.StockMatierePremiere"%>
<%@page import="java.util.List" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    List<StockMatierePremiere> produits = (List<StockMatierePremiere>)request.getAttribute("produits");
%>
    <%@ include file="header.jsp" %>
        <label for="search" class="form-label">Rechercher par matière :</label>
        <input type="text" id="search" oninput="filterTable()" class="form-control mb-3">

        
                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">

                    </div>

                    <!-- Content Row -->
                    <div class="row">

                    </div>

                    <!-- Content Row -->

                    <div class="row">
                        <label for="dropdown" class="form-label">Liste des matières</label>
                        <!-- Area Chart -->
                        <div class="col-xl-12 col-lg-7">
                            <div class="card shadow mb-4">
                               
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>matiere</th>
                                            <th>stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <% for(StockMatierePremiere produit : produits){%>
                                            <tr>
                                                <td>
                                                    <%= produit.getDesignation() %>
                                                </td>
                                                <td>
                                                    <%=produit.getStock()%>
                                                </td> 
                                            </tr>
                                            <% } %>
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
    <script>
    function filterTable() {
        // Récupérer la valeur de la zone de recherche
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.querySelector(".table");
        tr = table.getElementsByTagName("tr");

        // Parcourir toutes les lignes de la table et masquer celles qui ne correspondent pas à la recherche
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0]; // Vous pouvez changer l'index en fonction de la colonne que vous voulez filtrer
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


            </div>
    <%@ include file="footer.jsp" %>
