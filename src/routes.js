/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Icons from "views/examples/Icons.js";
import Categorie from "views/crud/Categorie.js";
import Marque from "views/crud/Marque.js";
import Modele from "views/crud/Modele.js";
import Type from "views/crud/Type.js";
import Devise from "views/crud/Devise.js";
import Commission from "views/crud/Commission.js";
import Annonce from "views/annnonce/Annonce.js";
import Voiture from "views/crud/Voiture.js";

var routes = [
  {
    path: "/statistiques",
    name: "Statistiques",
    icon: "ni ni-chart-bar-32 text-primary",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/annonces",
    name: "Annonce",
    icon: "ni ni-single-copy-04 text-green",
    component: <Annonce />,
    layout: "/admin",
  },
  {
    path: "/categorie",
    name: "Categorie",
    icon: "ni ni-books text-purple",
    component: <Categorie />,
    layout: "/admin",
  },
  {
    path: "/marque",
    name: "Marque",
    icon: "ni ni-planet text-orange",
    component: <Marque />,
    layout: "/admin",
  },
  {
    path: "/modele",
    name: "Modele",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: <Modele />,
    layout: "/admin",
  },
  {
    path: "/type",
    name: "Type",
    icon: "ni ni-map-big text-red",
    component: <Type />,
    layout: "/admin",
  },
  {
    path: "/devise",
    name: "Devise",
    icon: "ni ni-credit-card text-info",
    component: <Devise />,
    layout: "/admin",
  },
  {
    path: "/commission",
    name: "Commission",
    icon: "ni ni-check-bold text-pink",
    component: <Commission />,
    layout: "/admin",
  },
  {
    path: "/voiture",
    name: "Voiture",
    icon: "ni ni-bus-front-12 text-brown",
    component: <Voiture />,
    layout: "/admin",
  },
];
export default routes;
