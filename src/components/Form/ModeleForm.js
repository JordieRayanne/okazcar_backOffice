import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
function ModeleForm(){
    return(
        <>
      {/* Page content */}
      <div style={{marginTop:"10%"}}></div>
      <Container className="mt--7" fluid style={{marginTop:"2%"}}>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Modele
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-nom"
                            placeholder="nom"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-date"
                          >
                            Marque
                          </label>
                          <br />
                          <select className="form-control-alternative" style={{width:"100%",height:"43px",borderRadius:"5pt"}}>
                            <option>huhu</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-date"
                          >
                            Date creation
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-date"
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                      <Row>
                        <Button  style={{margin:"20px 0px 0px 54%", color:"black",height:"35px"}} color="info">OK</Button>
                      </Row>

                    </Row>
                    </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    );
}

export default ModeleForm;