<%-- 
    Document   : benefice
    Created on : 16 janv. 2024, 13:30:38
    Author     : LENOVO
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        
    <%@ include file="header.jsp" %>

    <!-- Begin Page Content -->
    <div class="container-fluid">

        <div>
            <form action="findB" method="get">
                <div class="input-group form-floating">
                    <input id="min" name="min" type="number" class="form-control">
                    <label for="min">Minimum</label>
                </div>
                <div class="input-group">
                    <input id="max" name="max" type="number" class="form-control">
                    <label for="max">Maximum</label>
                </div>
                <div class="input-group">
                    <input type="submit" value="Soumettre">
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
    </body>
</html>
