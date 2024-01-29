import DeviseForm from "components/Form/DeviseForm";
import DeviseList from "components/List/DeviseList";
import React from "react";

function Devise(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <DeviseForm />
            <DeviseList />
        </div>
    );
}

export default Devise;
