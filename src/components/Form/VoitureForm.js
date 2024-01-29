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
    alert(response.text());
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); 
  })
  .then(text => {
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

  const [formValues, setFormValues] = useState(initialState);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //insert voiture
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        await submitForm(event.target, token());
      console.log('Form submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
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
                            value={formValues.nom}
                            onChange={handleInputChange}
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
                            value={formValues.idcategorie}
                            onChange={handleInputChange}
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                             {categories.map((categorie) => (
                              <option
                                key={categorie.id}
                                value={categorie.id}
                                selected={formValues.idcategorie !== -1 && formValues.idcategorie === categorie.id}
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
                            value={formValues.idtype}
                            onChange={handleInputChange}
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                              {types.map((type) => (
                              <option
                                key={type.id}
                                value={type.id}
                                selected={formValues.idtype !== -1 && formValues.idtype === type.id}
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
                            value={formValues.idmodele}
                            onChange={handleInputChange}
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                              {modeles.map((modele) => (
                              <option
                                key={modele.id}
                                value={modele.id}
                                selected={formValues.idmodele !== -1 && formValues.idmodele === modele.id}
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
                            value={formValues.couleur}
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
                            value={formValues.localisation}
                            onChange={handleInputChange}
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
                            value={formValues.description}
                            onChange={handleInputChange}
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
                            value={formValues.image1}
                            onChange={handleInputChange}
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
                            value={formValues.image2}
                            onChange={handleInputChange}
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
                            value={formValues.image3}
                            onChange={handleInputChange}
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