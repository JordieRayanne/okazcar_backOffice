import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
const initialState = {
  nom: '',
  idcategorie: -1,
  idtype: -1,
  idmodele: -1,
  couleur: '',
  localisation: '',
  description: '',
  image1: '',
  image2: '',
  image3: ''
};

//gett all categorie
function getAllCategorie() {
  return fetch('https://okazcar.up.railway.app/categories',{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjU2NzIsImV4cCI6MTcwNjQ3Mjg3Mn0.d3-HEA8_nYzLU2BRfCtvsIMYjBylXz1_IM594OcsPRI'
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching categories:', error);
      throw error; 
    });
}

//get all type
function getAllType() {
  return fetch('https://okazcar.up.railway.app/types',{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjU2NzIsImV4cCI6MTcwNjQ3Mjg3Mn0.d3-HEA8_nYzLU2BRfCtvsIMYjBylXz1_IM594OcsPRI'
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching types:', error);
      throw error; 
    });
}

//get all modele
function getAllModele() {
  return fetch('https://okazcar.up.railway.app/modeles',{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjU2NzIsImV4cCI6MTcwNjQ3Mjg3Mn0.d3-HEA8_nYzLU2BRfCtvsIMYjBylXz1_IM594OcsPRI'
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching modeles:', error);
      throw error; 
    });
}

function submitForm(data) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  return fetch('https://okazcar.up.railway.app/voiture', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1haGZpdGFoaWFuYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjU2NzIsImV4cCI6MTcwNjQ3Mjg3Mn0.d3-HEA8_nYzLU2BRfCtvsIMYjBylXz1_IM594OcsPRI'
    },
    body: formData,
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
  const [formValues, setFormValues] = useState(initialState);

  //Categorie
  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const categorieData = await getAllCategorie();
        setCategorie(categorieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorie();
  }, []);

  // Type
  useEffect(() => {
    const fetchType= async () => {
      try {
        const typeData = await getAllType();
        setType(typeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchType();
  }, []);

  //Modele
  useEffect(() => {
    const fetchModele= async () => {
      try {
        const typeData = await getAllModele();
        setModele(typeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModele();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //insert voiture
  const handleSubmit = async () => {
    const formData = {
      nom: formValues.nom,
      categorie: formValues.idcategorie,
      type: formValues.idtype,
      modele: formValues.idmodele,
      couleur: formValues.couleur,
      localisation: formValues.localisation,
      description: formValues.description,
      prix: 0,
      devise: 0,
      image1: formValues.image1,
      image2: formValues.image2,
      image3:formValues.image3
    };

    try {
        await submitForm(formData);
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
                <Form>
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
                            className="form-control-alternative"
                            name="nom"
                            value={formValues.nom}
                            onChange={handleInputChange}
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
                            className="form-control-alternative"
                            id="input-categorie"
                            name="idcategorie"
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
                            className="form-control-alternative"
                            id="input-type"
                            name="idtype"
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
                            className="form-control-alternative"
                            id="input-modele"
                            name="idmodele"
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
                            className="form-control-alternative"
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
                            className="form-control-alternative"
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
                            className="form-control-alternative"
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
                            className="form-control-alternative"
                            name="image1"
                            value={formValues.image1}
                            onChange={handleInputChange}
                            placeholder="image1"
                            type="file"
                          />
                           <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Image 2
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="image2"
                            value={formValues.image2}
                            onChange={handleInputChange}
                            placeholder="image2"
                            type="file"
                          />
                           <label
                            className="form-control-label"
                            htmlFor="input-nom"
                          >
                            Image 3
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="image3"
                            value={formValues.image3}
                            onChange={handleInputChange}
                            placeholder="image3"
                            type="file"
                          />
                          <Button  
                            style={{marginTop:"20px", color:"black",height:"35px"}} 
                            color="info"
                            onClick={handleSubmit}
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
