import TypeForm from "components/Form/TypeForm";
import TypeList from "components/List/TypeList";
import React from "react";

function Type(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <TypeForm />
            <TypeList />
        </div>
    );
}

export default Type;
