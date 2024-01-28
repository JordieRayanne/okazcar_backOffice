import React, { useState, useEffect } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Col,
  Row,
  UncontrolledTooltip,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap';
import ModeleForm from 'components/Form/ModeleForm';
import { RingLoader } from 'react-spinners'; // Import the spinner component

function ModeleList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModele, setSelectedModele] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/modeles');
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

  const handleModifierClick = (modele) => {
    setSelectedModele({ ...modele });
  };

  const handleSupprimerClick = (item) => {
    setConfirmDeleteModal(true);
    console.log(item.id+" huhu");
    setDeleteId(item.id);
  };

  const handleConfirmDelete = () => { 
    fetch(`http://localhost:8080/modeles/${DeleteId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Item deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });

    // For now, just close the modal
    window.location.reload();
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
          <h3 className="mb-0">Liste Modele</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Marque</th>
              <th scope="col">Date creation</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td>Marque 1</td>
                  <td>{item.dateCreation}</td>
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
        <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              {/* ...pagination links */}
            </Pagination>
          </nav>
        </CardFooter>
      </Card>
      {selectedModele && (
        <ModeleForm
          key={selectedModele.id}
          title={'Modifier Modele'}
          id={selectedModele.id}
          idmarque={selectedModele.idmarque}
          nom={selectedModele.nom}
          dateCreation={selectedModele.dateCreation}
          isUpdate={true}
        />
      )}
      {/* Confirmation Modal */}
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

export default ModeleList;
