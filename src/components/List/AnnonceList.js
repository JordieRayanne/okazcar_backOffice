import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, UncontrolledTooltip } from 'reactstrap';
import { RingLoader } from 'react-spinners'; // Import the spinner component

const AnnonceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0Mzg1MjAsImV4cCI6MTcwNjQ0NTcyMH0.Gs5HnbRkSxPZ4f2ZHQBs0RgltXiPUY_jIYD1PP9ZIyE'; // Replace with your actual token
  
        const response = await fetch('https://okazcar.up.railway.app/annonces', {
          headers: {
            Authorization: `Bearer ${token}`
          },
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
  

  const handleAnnonceClick = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('http://localhost:8080/annonces');
      const result = await response.json();
      setData(result);
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
          <Row style={{ margin: '-7% 0px 3% 95%' }}>
            <div
              className="icon icon-shape bg-danger text-white rounded-circle shadow"
              id="tooltip-icon"
              onClick={handleAnnonceClick}
            >
              <i className="ni ni-bell-55" />
              <UncontrolledTooltip placement="right" target="tooltip-icon">
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
                          {annonce.voitureUtilisateur.utilisateur.username}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {annonce.voitureUtilisateur.voiture.nom} -{' '}
                          {annonce.voitureUtilisateur.voiture.modele.marque.nom}{' '}
                          {annonce.voitureUtilisateur.voiture.categorie.nom}{' '}<br />
                        </span>
                          Type: {annonce.voitureUtilisateur.voiture.type.nom}
                        <h5>immatriculation: {annonce.voitureUtilisateur.immatriculation}</h5>
                        <h4>
                          Prix de vente: {annonce.prixVoiture}{' '}
                          {annonce.voitureUtilisateur.devise.nom} - Prix du commission: {annonce.prixCommission} {annonce.voitureUtilisateur.devise.nom}
                        </h4>
                        {/* (<span className="text-success mr-2">{annonce.commission.commission} %</span>) */}
                        <h4>Localisation: {annonce.voitureUtilisateur.voiture.localisation}</h4>
                        <h4>Date de demande: {annonce.voitureUtilisateur.voiture.dateDemande}</h4>
                      </Col>
                      <div
                        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                        style={{
                          minHeight: '300px',
                          width: '100%',
                          backgroundImage:
                            'url(' + require('../../assets/img/theme/profile-cover.jpg') + ')',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center top',
                        }}
                      ></div>
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


