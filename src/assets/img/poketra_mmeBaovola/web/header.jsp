<%@page contentType="text/html" pageEncoding="UTF-8"%>                
<!DOCTYPE html>
                <html lang="en">

                <head>

                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="description" content="">
                    <meta name="author" content="">

                    <title>SB Admin 2 - Dashboard</title>

                    <!-- Custom fonts for this template-->
                    <link href="template/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
                    <link
                        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                        rel="stylesheet">

                    <!-- Custom styles for this template-->
                    <link href="template/css/sb-admin-2.min.css" rel="stylesheet">
                    
                    <style>
                        
                        /* Style pour le lien avec la classe "look" */
                        a.look {
                            color: white;
                            text-decoration: none; 
                            font-size: 14px; 
                            cursor: pointer;
                            margin-left: 30px;
                        }

                        /* Style pour le span à l'intérieur du lien */
                        a.look span {
                            border-bottom: 2px solid #ccb64b; 
                        }
                        .menu span{
                            color: white;
                            font-size:13px;
                            font-weight:lighter;
                        }
                    </style>

                </head>

                <body id="page-top">

                    <!-- Page Wrapper -->
                    <div id="wrapper">

                        <!-- Sidebar -->
                        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                            <!-- Sidebar - Brand -->
                            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                                <div class="sidebar-brand-icon rotate-n-15">
                                    <i class="bi bi-bag-fill"></i>
                                </div>
                                <div class="sidebar-brand-text mx-3">Poketra</div>
                            </a>

                            <!-- Divider -->
                            <hr class="sidebar-divider my-0">

                            <!-- Nav Item - Dashboard -->
                            <li class="nav-item active">
                                <a class="nav-link" href="index.html">
                                    <i class="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard</span></a>
                            </li>

                            <!-- Divider -->
                            <hr class="sidebar-divider">

                            <!-- Heading -->
                            <div class="sidebar-heading">
                                Interface
                            </div>

                            <!-- Nav Item - Pages Collapse Menu -->
                            <li class="nav-item">
                                <form id="quantiteMatiereForm" action="QuantiteController" method="post">
                                    <a href="#" class="look" onclick="document.getElementById('quantiteMatiereForm').submit();"><span>Quantite Produit</span></a>
                                </form>  
                            </li>

                            <!-- Nav Item - Utilities Collapse Menu -->
                            <li class="nav-item">
                                <form id="produitForm" action="ProduitController" method="post">
                                    <a href="#" class="look" onclick="document.getElementById('produitForm').submit();"><span>Produit</span></a>
                                </form>                               
                            </li>
                            
                            <li class="nav-item">
                                <form id="employeForm" action="DonneFormEmploye" method="post">
                                    <a href="#" class="look" onclick="document.getElementById('employeForm').submit();"><span>Employe</span></a>
                                </form>                               
                            </li>

                            <li class="nav-item">
                                    <form id="lookForm" action="LookServlet" method="post">
                                        <a href="#" class="look" onclick="document.getElementById('lookForm').submit();"><span>Matière par look</span></a>
                                    </form>
                                    <!-- menu -->  
                                    <ul class="menu">
                                        <form id="insertionForm" action="InsertionMatiereLook" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('insertionForm').submit();"><span>insertion matière look</span></a></li>
                                        </form>
                                        <!-- <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li> -->
                                    </ul> 
                                    <!-- menu -->  
                                    <ul class="menu">
                                        <form id="insertionMatiereForm" action="DonneMatiere" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('insertionMatiereForm').submit();"><span>insertion matière</span></a></li>
                                        </form>
                                        <!-- <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li> -->
                                    </ul>
                                    <ul class="menu">
                                        <form id="filtrePrix" action="DonneFiltrePrix" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('filtrePrix').submit();"><span>Filtre</span></a></li>
                                        </form>
                                        <!-- <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li> -->
                                    </ul>
                                    <ul class="menu">
                                        <form id="stockProduit" action="DonneStockProduit" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('stockProduit').submit();"><span>Stock Produit</span></a></li>
                                        </form>
                                        <!-- <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li> -->
                                    </ul>
                                    <ul class="menu">
                                        <form id="stockMatiere" action="DonneStockMatierePremiere" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('stockMatiere').submit();"><span>Stock Matiere</span></a></li>
                                        </form>
                                        <!-- <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li> -->
                                    </ul>
                                    <ul class="menu">
                                        <form id="produitPrix" action="DonneProduitPrix" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('produitPrix').submit();"><span>Produit prix</span></a></li>
                                        </form>
                                        <!-- <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li> -->
                                    </ul>
                                    <ul class="menu">
                                        <form id="produitfab" action="DonneProduitFabricationEmploye" method="post">
                                            <li><a href="#" class="insert" onclick="document.getElementById('produitfab').submit();"><span>Produit fabrication employe</span></a></li>
                                        </form>
                                    </ul>
                          </li>

                            <!-- Divider -->
                            <hr class="sidebar-divider">
                                          
                            <!-- Divider -->
                            <hr class="sidebar-divider d-none d-md-block">

                            <!-- Sidebar Toggler (Sidebar) -->
                            <div class="text-center d-none d-md-inline">
                                <button class="rounded-circle border-0" id="sidebarToggle"></button>
                            </div>

                        </ul>
                        <!-- End of Sidebar -->

                        <!-- Content Wrapper -->
                        <div id="content-wrapper" class="d-flex flex-column">

                            <!-- Main Content -->
                            <div id="content">

                                <!-- Topbar -->
                                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                    <!-- Sidebar Toggle (Topbar) -->
                                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                                        <i class="fa fa-bars"></i>
                                    </button>

                                    <!-- Topbar Search -->


                                    <!-- Topbar Navbar -->
                                    <ul class="navbar-nav ml-auto">

                                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->


                                        <!-- Nav Item - Alerts -->


                                        <!-- Nav Item - Messages -->


                                        <div class="topbar-divider d-none d-sm-block"></div>

                                        <!-- Nav Item - User Information -->
                                        <li class="nav-item dropdown no-arrow">
                                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas
                                                    McGee</span>
                                                <img class="img-profile rounded-circle"
                                                    src="controller/template/img/undraw_profile.svg">
                                            </a>
                                            <!-- Dropdown - User Information -->
                                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                aria-labelledby="userDropdown">
                                                <a class="dropdown-item" href="#">
                                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Profile
                                                </a>
                                                <a class="dropdown-item" href="#">
                                                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Settings
                                                </a>
                                                <a class="dropdown-item" href="#">
                                                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Activity Log
                                                </a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#" data-toggle="modal"
                                                    data-target="#logoutModal">
                                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                    Logout
                                                </a>
                                            </div>
                                        </li>

                                    </ul>

                                </nav>
                                <!-- End of Topbar -->