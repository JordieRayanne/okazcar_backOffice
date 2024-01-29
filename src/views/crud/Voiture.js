import VoitureForm from "components/Form/VoitureForm";
import VoitureList from "components/List/VoitureList";
import React from "react";

function Voiture(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <VoitureForm />
            <VoitureList />
        </div>
    );
}

export default Voiture;
