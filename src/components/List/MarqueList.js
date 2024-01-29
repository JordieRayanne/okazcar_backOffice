import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Button,
  Input,
} from "reactstrap";
import {useAuthHeader} from "react-auth-kit";

function MarqueList() {
  const [marques, setMarques] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newNom, setNewNom] = useState('');
  const token = useAuthHeader()

  const listMarques = () => {
    axios.get('https://okazcar.up.railway.app/marques', {
      headers: {
        Authorization: token()
      }
    })
    .then(response => {
      console.log('API Response:', response.data); // Log the response data
      setMarques(response.data); // Assuming response.data is the array of marques
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des marques', error);
    });
  };

  const handleEdit = (id) => {
    setEditingId(parseInt(id, 10));
    const marqueToEdit = marques.find(marque => marque.id === parseInt(id, 10));
    setNewNom(marqueToEdit.nom);
  };

  const handleUpdate = () => {
    axios.put(`https://okazcar.up.railway.app/marques/${editingId}`, { nom: newNom }, {
      headers: {
        Authorization: token()
      }
    })
      .then(response => {
        console.log('Réponse de la mise à jour:', response.data);
        setEditingId(null);
        setNewNom('');
        listMarques();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour:', error);
        console.log('Réponse côté client:', error.response);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://okazcar.up.railway.app/marques/${id}`, {
      headers: {
        Authorization: token()
      }
    })
      .then(response => {
        console.log('Réponse de la suppression:', response.data);
        listMarques();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression:', error);
      });
  };

  useEffect(() => {
    listMarques();
  }, []);

  const confirmDelete = (id) => {
    const shouldDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
    if (shouldDelete) {
      handleDelete(id);
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Liste Marque</h3>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
        {marques.map((marque, index) => (
            <tr key={index}>
              <td>
                {editingId === marque.id ? (
                  <>
                    <Input
                      marque="text"
                      value={newNom}
                      onChange={(e) => setNewNom(e.target.value)}
                    />
                    {editingId === marque.id && (
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
                  marque.nom
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
                      onClick={() => confirmDelete(marque.id)}
                      style={{ color: "red" }}
                    >
                      Supprimer
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => handleEdit(marque.id)}
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

export default MarqueList;
