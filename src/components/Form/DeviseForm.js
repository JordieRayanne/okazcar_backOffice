import { useState } from "react";
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
import {useAuthHeader} from "react-auth-kit";
function DeviseForm(){
  const[nom,setNom]=useState('');
  const token = useAuthHeader()

  const handleInsertion = () => {
      const formData = new FormData()
      formData.append("nom", nom)

    fetch('https://okazcar.up.railway.app/devise',{
      method: 'POST',
      headers: {
        'Authorization': token()
      },
        body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse de l\'insertion:', data);
        window.location.reload();

      })
      .catch(error => {
        console.error('Erreur lors de l\'insertion:', error);
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
                    Devise
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
                            defaultValue="lucky.jesse"
                            id="input-nom"
                            placeholder="nom"
                            type="text"
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

export default DeviseForm;
