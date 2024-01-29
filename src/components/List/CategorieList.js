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
function CategorieList(){
  const[Categories,setCategories]=useState([]);
  const[editingId, setEditingId]=useState(null);
  const[newNom,setNewNom]=useState(null);
  const token = useAuthHeader()

  const listCategories=()=>{

    axios.get('https://okazcar.up.railway.app/categories', {
      headers: {
        Authorization: token()
      }
    })
      .then(Response=>{
        setCategories(Response.data)
      })
      .catch(error=>{
        console.log("Error",error);
      });
  };

  const handleEdit=(id)=>{
    setEditingId(parseInt(id,10));
    const categorieToEdit=Categories.find(categorie=>categorie.id===parseInt(id,10));
    setNewNom(categorieToEdit.nom);
  };

  const handleUpdate = () => {
    axios.put(`https://okazcar.up.railway.app/categories/${editingId}`, { nom: newNom }, {
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
        listCategories();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        console.log('Réponse côté client:', error.response);
      });

  };
  

  const handleDelete = (id) => {
    console.log('ID à supprimer:', id);
    axios.delete(`https://okazcar.up.railway.app/categories/${id}`, {
      headers: {
        Authorization: token()
      }
    })
      .then(response => {
        console.log('Réponse de la suppression:', response.data);
        listCategories();
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
    listCategories();
  },[]);

  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Liste Catégories</h3>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Actions</th> {/* Nouvelle colonne pour les actions */}
          </tr>
        </thead>
        <tbody>
          {Categories.map((categorie, index) => (
            <tr key={index}>
              <td>
                {editingId === categorie.id ? (
                  <>
                    <Input
                      type="text"
                      value={newNom}
                      onChange={(e) => setNewNom(e.target.value)}
                    />
                    {editingId === categorie.id && (
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
                  categorie.nom
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
                      onClick={() => confirmDelete(categorie.id)}
                      style={{ color: "red" }}
                    >
                      Supprimer
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => handleEdit(categorie.id)}
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


export default CategorieList;