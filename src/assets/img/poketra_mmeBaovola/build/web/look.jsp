<%@page import="model.Matiere"%>
<%@page import="model.Look" %>
    <%@page import="java.util.List" %>
    <% 
        List<Look> looklist = (List<Look>)request.getAttribute("looks");
            List<Matiere> matieres = null;
                try{
                    Matiere matiere = new Matiere();
                    matieres = matiere.getAll(null);
                }
                catch(Exception e){
                    out.println(e.getMessage());
                }
    %>    
    <%@ include file="header.jsp" %>

    <!-- Begin Page Content -->
    <div class="container-fluid">

        <div>
            <form action="LookSearch" method="get">
                <div class="input-group form-floating">
                    <select id="chooseLook" class="form-control" name="idMatiere">
                        <% for(Matiere matiere : matieres) { %>
                            <option value="<%= matiere.getId() %>"><%= matiere.getDesignation() %></option>
                        <% } %>
                    </select>
                    <label for="chooseLook">Choisissez un look</label>
                </div>
                    <div class="input-group">
                        <input class="btn btn-primary" type="submit" value="Valider">
                    </div>
            </form>
        </div>

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
                <form action="TraitementLook" method="post">
                    <div class="mb-3">
                        <label for="dropdown" class="form-label">Choisir un look :</label>
                        <select id="dropdown" name="dropdown_look" class="form-control">
                        <% for (Look look : looklist) { %>
                                <option value="<%= look.getId() %>">
                                    <%= look.getDesignation() %>
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

                            