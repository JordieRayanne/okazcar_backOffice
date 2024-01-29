import { useState } from "react";
import axios from "axios";
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";
function CommissionForm(){
  const[commission,setCommission]=useState('');

  const handleInsertion=()=>{
    const formData={
      commission:commission,
    };
    console.log(formData);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjE4NDEsImV4cCI6MTcwNjQ2OTA0MX0.-Jn5DPKV6ZiAR4kEXsjyq5YCTqZR5WoQMhnuxul4ihs'; // Replace with your actual token

    axios.post('https://okazcar.up.railway.app/commission', formData, {
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
                            value={commission}
                            onChange={(e)=>setCommission(e.target.value)}
                            defaultValue="10"                            
                            id="input-valeur"
                            placeholder="valeur"
                            type="number"
                            step="any"
                          />
                          <Button  
                            style={{marginTop:"20px", color:"black",height:"35px"}}
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

export default CommissionForm;