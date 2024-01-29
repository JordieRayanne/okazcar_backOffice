import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
    Input,
    Button,
  } from "reactstrap";
import {useAuthHeader} from "react-auth-kit";
function TypeList(){
  const[types,setTypes]=useState([]);
  const[editingId, setEditingId]=useState(null);
  const[newNom,setNewNom]=useState(null);
  const token = useAuthHeader()

  const listTypes=()=>{
    axios.get('https://okazcar.up.railway.app/types', {
      headers: {
        Authorization: token()
      }
    })
      .then(Response=>{
        setTypes(Response.data)
      })
      .catch(error=>{
        console.log("Error",error);
      });
  };

  const handleEdit=(id)=>{
    setEditingId(parseInt(id,10));
    const typeToEdit=types.find(type=>type.id===parseInt(id,10));
    setNewNom(typeToEdit.nom);
  };

  const handleUpdate = () => {
    axios.put(`https://okazcar.up.railway.app/types/${editingId}`, { nom: newNom }, {
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
        listTypes();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        console.log('Réponse côté client:', error.response);
      });

  };
  

  const handleDelete = (id) => {
    console.log('ID à supprimer:', id);
    axios.delete(`https://okazcar.up.railway.app/types/${id}`, {
      headers: {
        Authorization: token()
      }
    })
      .then(response => {
        console.log('Réponse de la suppression:', response.data);
        listTypes();
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
    listTypes();
  },[]);

    return(
      <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Liste Type</h3>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
        {types.map((type, index) => (
            <tr key={index}>
              <td>
                {editingId === type.id ? (
                  <>
                    <Input
                      type="text"
                      value={newNom}
                      onChange={(e) => setNewNom(e.target.value)}
                    />
                    {editingId === type.id && (
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
                  type.nom
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
                      onClick={() => confirmDelete(type.id)}
                      style={{ color: "red" }}
                    >
                      Supprimer
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => handleEdit(type.id)}
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


export default TypeList;