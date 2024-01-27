
<%@page import="model.Look , model.Matiere , model.Produit" %>
<%@page import="java.util.List" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    List<Produit> produits = (List<Produit>)request.getAttribute("produits");
%>
    <%@ include file="header.jsp" %>
        
        
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
                                            <th>Nom poketra</th>
                                            <th>Prix</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <% for(Produit produit : produits){%>
                                            <tr>
                                                <td>
                                                    <%= produit.getNom() %>
                                                </td>
                                                <td>
                                                    <%=produit.getPriceById()%>
                                                </td> 
                                            </tr>
                                            <% } %>
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
        

            </div>
    <%@ include file="footer.jsp" %>
