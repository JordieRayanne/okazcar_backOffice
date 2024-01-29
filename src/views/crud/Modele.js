import ModeleForm from "components/Form/ModeleForm";
import ModeleList from "components/List/ModeleList";
import React from "react";

function Modele(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <ModeleForm />
            <ModeleList />
        </div>
    );
}

export default Modele;
