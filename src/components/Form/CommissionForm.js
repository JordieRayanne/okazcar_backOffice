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
function CommissionForm(){
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
                    Commission
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-valeur"
                          >
                            Valeur
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="0.0 %"
                            id="input-valeur"
                            placeholder="0.0 %"
                            type="number"
                            step="any"
                          />
                          <Button  style={{marginTop:"20px", color:"black",height:"35px"}} color="info">OK</Button>
                        </FormGroup>
                      </Col>
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

export default CommissionForm;