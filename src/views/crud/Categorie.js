import CategorieForm from "components/Form/CategorieForm";
import CategorieList from "components/List/CategorieList";
import React from "react";

function Categorie(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <CategorieForm />
            <CategorieList />
        </div>
    );
}

export default Categorie;
