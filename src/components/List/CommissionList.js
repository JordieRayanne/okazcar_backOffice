import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    Table,
  } from "reactstrap";
import {useAuthHeader} from "react-auth-kit";
function CommissionList(){
  const[commissions,setCommissions]=useState([]);
  const token = useAuthHeader()

  const listCommissions=()=>{

    axios.get('https://okazcar.up.railway.app/commissions', {
      headers: {
        Authorization: token()
      }
    }).then(response => {
        console.log('API Response:', response.data); // Log the response data
        setCommissions(response.data); // Assuming response.data is the array of marques
    })
      .catch(error=>{
        console.log("Error",error);
      });
  };

  useEffect(()=>{
    listCommissions();
  },[]);


    return(
        <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Historique Commission</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Valeur (%)</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((commission, index) => (
                    <tr key={index}>
                      <td>{commission.dateHeureCommission}</td>
                      <td>{commission.commission}</td>
                    </tr> 
                  ))}
                </tbody>
              </Table>
            </Card>
    );
}


export default CommissionList;
