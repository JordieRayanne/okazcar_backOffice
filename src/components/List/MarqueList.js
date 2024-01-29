import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Button,
  Input,
} from "reactstrap";

function MarqueList() {
  const [marques, setMarques] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newNom, setNewNom] = useState('');

  const listMarques = () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjE4NDEsImV4cCI6MTcwNjQ2OTA0MX0.-Jn5DPKV6ZiAR4kEXsjyq5YCTqZR5WoQMhnuxul4ihs'; // Replace with your actual token
    
    axios.get('https://okazcar.up.railway.app/marques', {
      headers: {
        Authorization: `Bearer ${token}`
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
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjE4NDEsImV4cCI6MTcwNjQ2OTA0MX0.-Jn5DPKV6ZiAR4kEXsjyq5YCTqZR5WoQMhnuxul4ihs'; // Replace with your actual token
    
    axios.put(`https://okazcar.up.railway.app/marques/${editingId}`, { nom: newNom }, {
      headers: {
        Authorization: `Bearer ${token}`
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
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjE4NDEsImV4cCI6MTcwNjQ2OTA0MX0.-Jn5DPKV6ZiAR4kEXsjyq5YCTqZR5WoQMhnuxul4ihs'; // Replace with your actual token
    
    axios.delete(`https://okazcar.up.railway.app/marques/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
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
      <CardFooter className="py-4">
        <nav aria-label="...">
          <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
          >
            <PaginationItem className="disabled">
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                tabIndex="-1"
              >
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="active">
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                2 <span className="sr-only">(current)</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      </CardFooter>
    </Card>
  );
}

export default MarqueList;
