import { useState } from "react";
import axios from "axios";
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
function TypeForm(){
  const[nom,setNom]=useState('');

  const handleInsertion=()=>{
    const formData={
      nom:nom,
    };
    console.log(formData);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjE4NDEsImV4cCI6MTcwNjQ2OTA0MX0.-Jn5DPKV6ZiAR4kEXsjyq5YCTqZR5WoQMhnuxul4ihs'; // Replace with your actual token

    axios.post('https://okazcar.up.railway.app/type', formData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
      .then(response => {
        console.log('Réponse de l\'insertion:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de l\'insertion:', error);
        console.log('Réponse côté client:', error.response);
      });
  };
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
                    Type
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
                            value={nom}
                            onChange={(e)=>setNom(e.target.value)}
                            defaultValue="sport"
                            id="input-nom"
                            placeholder="type"
                            type="text"
                          />
                          <Button  style={{marginTop:"20px", color:"black",height:"35px"}} 
                            color="info"
                            onClick={handleInsertion}
                          >OK</Button>
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

export default TypeForm;