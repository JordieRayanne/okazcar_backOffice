<%@page import="model.MatiereLook"%>
<%@page import="java.util.List"%>
<% 
    List<MatiereLook> matierelooks=(List<MatiereLook>)request.getAttribute("matierelooks");
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
                        <label for="dropdown" class="form-label">Liste des mati�res</label>
                        <!-- Area Chart -->
                        <div class="col-xl-12 col-lg-7">
                            <div class="card shadow mb-4">
                               
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mati�re</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <% for(MatiereLook mk:matierelooks){%>
                                            <tr>
                                                <td>
                                                    <%= mk.getId()%>
                                                </td>
                                                <td>
                                                    <%= mk.getMatiere()%>
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
