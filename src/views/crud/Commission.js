import CommissionForm from "components/Form/CommissionForm";
import CommissionList from "components/List/CommissionList";
import React from "react";

function Commission(){
    return(
        <div style={{width:"75%",marginLeft:"20%"}}>
            <CommissionForm />
            <CommissionList />
        </div>
    );
}

export default Commission;
