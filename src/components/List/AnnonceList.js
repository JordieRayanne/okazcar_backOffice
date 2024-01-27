import { Card, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";

const AnnonceList = () => {
  return (
      <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row style={{margin:"-7% 0px 3% 95%"}}>
              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                <i className="ni ni-bell-55" />
              </div>
            </Row>
            <Row>
              <Col lg="2" xl="4">
                <Card style={{height:"60vh"}} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Jean Charles
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          AU09823 - Tesla Model S
                        </span>
                        <h4>Prix de vente: 100.000 Ar - commission: 10.000 Ar </h4>
                          
                          (<span className="text-success mr-2">
                         3.48%
                        </span>)
                        <h4>Localisation: Tanjombato</h4>
                        <h4>Date de demande: 10 Nov. 2021 17:01</h4>
                      </div>
                      <div
                        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                        style={{
                          minHeight: "300px",
                          width: "100%",
                          backgroundImage:
                            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center top",
                        }}
                      ></div>
                      {/* <Col className="col-auto">
                        <Button style={{backgroundColor:"lightgreen"}}>Accepter</Button>
                      </Col> */}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </div>
        </Container>
      </div>
  );
};

export default AnnonceList;
