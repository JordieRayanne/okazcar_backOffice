<%-- 
    Document   : resultSearch
    Created on : 19 déc. 2023, 13:23:38
    Author     : LENOVO
--%>
<%@page import="model.Look , model.Matiere , model.Produit" %>
<%@page import="java.util.List" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    List<Produit> produits = (List<Produit>)request.getAttribute("resultSearch");
    Matiere matiere = (Matiere)request.getAttribute("curr_matiere");
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
                                            <th>Matiere</th>
                                            <th>Quantite</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <% for(Produit produit : produits){%>
                                            <tr>
                                                <td>
                                                    <%= produit.getNom() %>
                                                </td>
                                                <td>
                                                    <%= matiere.getDesignation()%>
                                                </td>
                                                <td>
                                                    <%= produit.getQteMatiere(matiere.getId()) %>
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
