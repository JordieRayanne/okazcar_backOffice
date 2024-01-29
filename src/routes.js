import Index from "views/Index.js";
import Voiture from "views/crud/Voiture.js";
import Categorie from "views/crud/Categorie.js";
import Marque from "views/crud/Marque";
import Modele from "views/crud/Modele";
import Type from "views/crud/Type";
import Devise from "views/crud/Devise";
import Commission from "views/crud/Commission";
import Annonce from "views/annnonce/Annonce";

var routes = [
  {
    path: "/index",
    name: "Statistiques",
    icon: "ni ni-chart-bar-32 text-primary",
    component: <Index />,
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
    path: "/voitures",
    name: "Voiture",
    icon: "ni ni-bus-front-12 text-brown",
    component: <Voiture />,
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
];
export default routes;