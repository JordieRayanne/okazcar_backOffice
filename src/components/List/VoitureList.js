import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap';
import VoitureForm from 'components/Form/VoitureForm';
import { RingLoader } from 'react-spinners';
import {useAuthHeader} from "react-auth-kit";
import axios from "axios"; // Import the spinner component

function VoitureList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVoiture, setSelectedVoiture] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState(-1);
  const token = useAuthHeader()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://okazcar.up.railway.app/voitures',{
          method:'GET',
          headers:{
            'Authorization': token()
          }
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModifierClick = (Voiture) => {
    setSelectedVoiture({ ...Voiture });
  };

  const handleSupprimerClick = (item) => {
    setConfirmDeleteModal(true);
    setDeleteId(item.voiture.id);
  };

  const handleConfirmDelete = () => {
    fetch(`https://okazcar.up.railway.app/voitures/${DeleteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token()
      }
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Item deleted successfully');
          return response.json();
        })
        .then(data => {
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
  };



  const handleCancelDelete = () => {
    setConfirmDeleteModal(false);
  };

  if (loading) {
    return (<Col className="text-center"><RingLoader style={{margin:"0px auto 0 auto"}} color={'purple'} loading={loading} size={60} /></Col> );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div style={{marginTop:"3%"}}></div>
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="mb-0">Liste Voiture</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Categorie</th>
              <th scope="col">Type</th>
              <th scope="col">Modele</th>
              <th scope="col">Couleur</th>
              <th scope="col">Localisation</th>
              <th scope="col">Description</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.voiture.nom}</td>
                  <td>{item.voiture.categorie.nom}</td>
                  <td>{item.voiture.type.nom}</td>
                  <td>{item.voiture.modele.nom}</td>
                  <td>{item.voiture.couleur}</td>
                  <td>{item.voiture.localisation}</td>
                  <td>{item.voiture.description}</td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={(e) => e.preventDefault()}
                        style={{ backgroundColor: 'purple' }}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem onClick={() => handleModifierClick(item)}>
                          Modifier
                        </DropdownItem>
                        <DropdownItem onClick={() =>handleSupprimerClick(item)} style={{ color: 'red' }}>
                          Supprimer
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
      {selectedVoiture && (
        <VoitureForm
          key={selectedVoiture.id}
          title={'Modifier Voiture'}
          id={selectedVoiture.id}
          nom={selectedVoiture.nom}
          isUpdate={true}
        />
      )}
      <Modal isOpen={confirmDeleteModal} toggle={handleCancelDelete}>
        <ModalHeader toggle={handleCancelDelete}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirmDelete}>Delete</Button>{' '}
          <Button color="secondary" onClick={handleCancelDelete}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default VoitureList;