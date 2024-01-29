import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
    Input,
    Button,
  } from "reactstrap";
import {useAuthHeader} from "react-auth-kit";
function DeviseList(){
  const[devises,setDevises]=useState([]);
  const[editingId, setEditingId]=useState(null);
  const[newNom,setNewNom]=useState(null);
  const token = useAuthHeader()

  const listDevises=()=>{
    axios.get('https://okazcar.up.railway.app/devises', {
      headers: {
        Authorization: token()
      }
    }).then(response => {
            console.log('API Response:', response.data); // Log the response data
            setDevises(response.data); // Assuming response.data is the array of marques
        })
      .catch(error=>{
        console.log("Error",error);
      });
  };

  const handleEdit=(id)=>{
    setEditingId(parseInt(id,10));
    const deviseToEdit=devises.find(devise=>devise.id===parseInt(id,10));
    setNewNom(deviseToEdit.nom);
  };

  const handleUpdate = () => {
      const formData = new FormData()
      formData.append("nom", newNom)
    axios.put(`https://okazcar.up.railway.app/devises/${editingId}`, formData, {
      headers: {
        Authorization: token()
      }
    })
      .then(response => {
        console.log('Réponse de la mise à jour:', response.data);
        // Réinitialiser les états après la mise à jour
        setEditingId(null);
        setNewNom('');
        // Mettre à jour la liste des catégories après la mise à jour
        listDevises();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        console.log('Réponse côté client:', error.response);
      });

  };
  

  const handleDelete = (id) => {
    console.log('ID à supprimer:', id);
    axios.delete(`https://okazcar.up.railway.app/devises/${id}`, {
      headers: {
        Authorization: token()
      }
    })
      .then(response => {
        console.log('Réponse de la suppression:', response.data);
        listDevises();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression:', error);
      });
  };

  const confirmDelete = (id) => {
    const shouldDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
    if (shouldDelete) {
      handleDelete(id);
    }
  };

  useEffect(()=>{
    listDevises();
  },[]);

    return(
      <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Liste Devise</h3>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
        {devises.map((devise, index) => (
            <tr key={index}>
              <td>
                {editingId === devise.id ? (
                  <>
                    <Input
                      devise="text"
                      value={newNom}
                      onChange={(e) => setNewNom(e.target.value)}
                    />
                    {editingId === devise.id && (
                      <Button
                        color="success"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleUpdate()}
                      >
                        Enregistrer
                      </Button>
                    )}
                  </>
                ) : (
                  devise.nom
                )}
              </td>
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                    style={{ backgroundColor: "purple" }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => confirmDelete(devise.id)}
                      style={{ color: "red" }}
                    >
                      Supprimer
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => handleEdit(devise.id)}
                    >
                      Modifier
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
    );
}


export default DeviseList;