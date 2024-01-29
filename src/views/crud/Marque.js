import MarqueForm from "components/Form/MarqueForm";
import MarqueList from "components/List/MarqueList";
import React from "react";

function Marque(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <MarqueForm />
            <MarqueList />
        </div>
    );
}

export default Marque;
