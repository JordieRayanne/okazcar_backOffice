<%@page import="model.Produit"%>
<%@page import="model.MatiereLook"%>
<%@page import="java.util.List"%>
<% 
    List<Produit> matierelooks=(List<Produit>)request.getAttribute("produitFiltre");
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
                                            <th>#</th>
                                            <th>Produit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <% for(Produit mk:matierelooks){%>
                                            <tr>
                                                <td>
                                                    <%= mk.getId()%>
                                                </td>
                                                <td>
                                                    <%= mk.getNom()%>
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
