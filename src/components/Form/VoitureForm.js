import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
import {useAuthHeader} from "react-auth-kit";

//gett all categorie
function getAllCategorie(token) {
  return fetch('https://okazcar.up.railway.app/categories',{
    method: 'GET',
    headers: {
      'Authorization': token
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching categories:', error);
      throw error; 
    });
}

//get all type
function getAllType(token) {
  return fetch('https://okazcar.up.railway.app/types',{
    method: 'GET',
    headers: {
      'Authorization': token
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching types:', error);
      throw error; 
    });
}

//get all modele
function getAllModele(token) {

  return fetch('https://okazcar.up.railway.app/modeles',{
    method: 'GET',
    headers: {
      'Authorization': token
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching modeles:', error);
      throw error; 
    });
}

function submitForm(form, token) {

  const formData = new FormData(form);

  let url = "https://okazcar.up.railway.app/voiture"

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': token,
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); 
  })
  .then(text => {
    console.log(text)
    console.log('Response text:', text);
  })
  .catch(error => {
    console.error('Error submitting form:', error);
    throw error;
  });
}


function VoitureForm({ title = 'Voiture', isUpdate = false }) {
  const [categories, setCategorie] = useState([]);
  const [types, setType] = useState([]);
  const [modeles, setModele] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useAuthHeader()

  //Categorie
  useEffect(() => {
    const fetchCategorie = async (token) => {
      try {
        const categorieData = await getAllCategorie(token);
        setCategorie(categorieData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorie(token());
  }, []);

  // Type
  useEffect(() => {
    const fetchType= async (token) => {
      try {
        const typeData = await getAllType(token);
        setType(typeData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchType(token());
  }, []);

  //Modele
  useEffect(() => {
    const fetchModele= async (token) => {
      try {
        const typeData = await getAllModele(token);
        setModele(typeData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModele(token());
  }, []);


  //insert voiture
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        await submitForm(event.target, token());
      console.log('Form submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error.toString());
    }
  };

    return(
        <>
      <div style={{marginTop:"10%"}}></div>
      <Container className="mt--7" fluid style={{marginTop:"2%"}}>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    {title}
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
                            className="form-control-alternative form-control"
                            name="nom"
                            required={true}
                            placeholder="nom"
                            type="text"
                          />
                          <hr></hr>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Catégorie
                          </label>
                          <br />
                          <select
                            className="form-control-alternative form-control"
                            id="input-categorie"
                            name="categorie"
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                             {categories.map((categorie) => (
                              <option
                                key={categorie.id}
                                value={categorie.id}
                              >
                                {categorie.nom}
                              </option>
                            ))}
                          </select>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Type
                          </label>
                          <br />
                          <select
                            className="form-control-alternative form-control"
                            id="input-type"
                            name="type"
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                              {types.map((type) => (
                              <option
                                key={type.id}
                                value={type.id}
                              >
                                {type.nom}
                              </option>
                            ))}
                          </select>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Modèle
                          </label>
                          <br />
                          <select
                            className="form-control-alternative form-control"
                            id="input-modele"
                            name="modele"
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                              {modeles.map((modele) => (
                              <option
                                key={modele.id}
                                value={modele.id}
                              >
                                {modele.nom}
                              </option>
                            ))}
                          </select>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Couleur
                          </label>
                          <br />
                          <select
                            className="form-control-alternative form-control"
                            id="input-couleur"
                            name="couleur"
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                              <option>Rouge</option>
                              <option>Bleu</option>
                              <option>Noir</option>
                          </select>
                          <hr></hr>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Localisation
                          </label>
                          <Input
                            className="form-control-alternative form-control"
                            name="localisation"
                            placeholder="localisation"
                            type="text"
                          />
                          <hr></hr>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Description
                          </label>
                          <Input
                            className="form-control-alternative form-control"
                            name="description"
                            placeholder="description"
                            type="text"
                          />
                          <hr></hr>
                          <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Image 1
                          </label>
                          <Input
                            className="form-control-alternative form-control"
                            name="image1"
                            placeholder="image1"
                            required={true}
                            type="file"
                          />
                           <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Image 2
                          </label>
                          <Input
                            className="form-control-alternative form-control"
                            name="image2"
                            placeholder="image2"
                            type="file"
                            required={true}
                          />
                           <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Image 3
                          </label>
                          <Input
                            className="form-control-alternative form-control"
                            name="image3"
                            required={true}
                            placeholder="image3"
                            type="file"
                          />
                          <Button  
                            style={{marginTop:"20px", color:"black",height:"35px"}} 
                            color="info"
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

export default VoitureForm;
