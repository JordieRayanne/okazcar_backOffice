import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, UncontrolledTooltip, Button } from 'reactstrap';
import { RingLoader } from 'react-spinners'; // Import the spinner component
import {useAuthHeader} from "react-auth-kit";
const AnnonceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isListValidated, setisListValidated] = useState(false);
const token = useAuthHeader()

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('https://okazcar.up.railway.app/voitureUtilisateurs_validated', {
          headers: {
            Authorization: token()
          },
        });
  
        const result = await response.json();
        setisListValidated(true);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handleValidate = async (annonceId) => {
    try {
      const response = await fetch(`https://okazcar.up.railway.app/voitureUtilisateurs/${annonceId}/to_10`, {
        method: 'GET',
        headers: {
          'Authorization': token()
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Validation successful!');
      await handleAnnonceClick();
    } catch (error) {
      console.error('Error during validation:', error);
      await handleAnnonceClick();
    }
  };

  const handleReject = async (annonceId) => {
    try {
      const response = await fetch(`https://okazcar.up.railway.app/voitureUtilisateurs/${annonceId}`, {
         method: 'DELETE',
         headers: {
           'Authorization': token()
         }
      });
  
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      alert('Rejected');
    } catch (error) {
      console.error('Error during validation:', error);
    }
  };
  
  const handleAnnonceClick = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

  
      const response = await fetch('https://okazcar.up.railway.app/voitureUtilisateurs_not_validated', {
        headers: {
          Authorization: token()
        },
      });
      const result = await response.json();
      setData(result);
      setisListValidated(false);
    } catch (error) {
      console.error('Error fetching voitureUtilisateurs_not_validated:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAnnonceAll = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

  
      const response = await fetch('https://okazcar.up.railway.app/voitureUtilisateurs_validated', {
        headers: {
          Authorization: token()
        },
      });
      const result = await response.json();
      setData(result);
      setisListValidated(true);
    } catch (error) {
      console.error('Error fetching voitureUtilisateurs_not_validated:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return(<Col className="text-center"><RingLoader style={{margin:"0px auto 0 auto"}} color={'purple'} loading={loading} size={60} /></Col> );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          <Row style={{ margin: '-7% 0px 3% 90%' }}>
          <div
              className="icon icon-shape bg-success text-white rounded-circle shadow"
              id="tooltip-icon-tout"
              onClick={handleAnnonceAll}
              style={{cursor:"pointer"}}
            >
              <i className="ni ni-align-center" />
              <UncontrolledTooltip placement="left" target="tooltip-icon-tout">
                Tout voir
              </UncontrolledTooltip>
            </div>
            <div
              className="icon icon-shape bg-danger text-white rounded-circle shadow"
              id="tooltip-icon"
              onClick={handleAnnonceClick}
              style={{margin:"0px 0px 0px 10px",cursor:"pointer"}}
            >
              <i className="ni ni-bell-55" />
              <UncontrolledTooltip placement="left" target="tooltip-icon">
                Annonce en attente
              </UncontrolledTooltip>
            </div>
          </Row>
          {data.map((annonce) => (
              <Row key={annonce.id}>
                <Col lg="2" xl="4">
                  <Card style={{ height: '60vh' }} className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <Col>
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            {annonce.voitureUtilisateur?.utilisateur.username}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {annonce.voitureUtilisateur?.voiture?.nom || annonce.voiture.nom} -{' '}
                            {annonce.voitureUtilisateur?.voiture?.modele?.marque?.nom ||
                              annonce.voiture.modele.marque.nom}{' '}
                            {annonce.voitureUtilisateur?.voiture?.categorie?.nom ||
                              annonce.voiture.categorie.nom} <br />
                            Type: {annonce.voitureUtilisateur?.voiture?.type?.nom || annonce.voiture.type.nom}
                          </span>
                          <h5>Immatriculation: {annonce.voitureUtilisateur?.immatriculation || ''}</h5>
                          <h4>
                            Prix de vente: {annonce.voitureUtilisateur.prix || ''} {annonce.voitureUtilisateur?.devise?.nom || ''}
                          </h4>
                          <h4>Localisation: {annonce.voitureUtilisateur?.voiture?.localisation || ''}</h4>
                          <h4>Date de demande: {annonce.voitureUtilisateur?.voiture?.dateDemande || ''}</h4>
                        </Col>
                        <img
                          alt="(impossible de faire un rendu de l'image "
                          src={`data:image/png;base64,${annonce.voitureImage.imagesBytes[0]}`}
                          style={{width:"100%"}}
                      />
                       {!isListValidated ? (
                          <>
                            <Button
                              style={{ margin: "20px 0px 0px 0px", backgroundColor: "lightgreen", color: "white" }}
                              onClick={() => handleValidate(annonce.voitureUtilisateur.id)}
                            >
                              Valider
                            </Button>
                            <Button 
                              style={{ margin: "20px 0px 0px 5%", backgroundColor: "lightsalmon", color: "white" }}
                              onClick={() => handleReject(annonce.voitureUtilisateur.id)}
                            >
                              Refuser
                            </Button>
                          </>
                        ) : ""}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ))}

        </div>
      </Container>
    </div>
  );
};

export default AnnonceList;


