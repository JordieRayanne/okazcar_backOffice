import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';

function getAllMarques() {
  return fetch('http://localhost:8080/marques')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching marques:', error);
      throw error;
    });
}

function submitForm(data) {
  return fetch('http://localhost:8080/modeles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error submitting form:', error);
      throw error;
    });
}

function updateForm(data) {
  console.log(`http://localhost:8080/modeles/${data.id}`);
  console.log(data);
  return fetch(`http://localhost:8080/modeles/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error updating form:', error);
      throw error;
    });
}

function ModeleForm({ title = "Modele", nom = "", id = -1, idmarque = -1, dateCreation = "", isUpdate = false }) {
  const [marques, setMarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [formValues, setFormValues] = useState({
    nom: nom,
    idmarque: idmarque,
    dateCreation: dateCreation,
  });

  useEffect(() => {
    setFormattedDate(dateCreation.split('T')[0]);
  }, [dateCreation]);

  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const marquesData = await getAllMarques();
        setMarques(marquesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarques();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const formData = {
      id: id,
      nom: formValues.nom,
      idmarque: formValues.idmarque,
      dateCreation: formValues.dateCreation,
    };

    try {
      if (isUpdate) {
        await updateForm(formData);
      } else {
        await submitForm(formData);
      }
      console.log('Form submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "10%" }}></div>
      <Container className="mt--7" fluid style={{ marginTop: "2%" }}>
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
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-marque"
                          >
                            Marque
                          </label>
                          <br />
                          <select
                            className="form-control-alternative"
                            id="input-marque"
                            name="idmarque"
                            value={formValues.idmarque}
                            onChange={handleInputChange}
                            style={{ width: "100%", height: "43px", borderRadius: "5pt" }}
                          >
                            {marques.map((marque) => (
                              <option
                                key={marque.id}
                                value={marque.id}
                                selected={formValues.idmarque !== -1 && formValues.idmarque === marque.id}
                              >
                                {marque.nom}
                              </option>
                            ))}
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
                            name="dateCreation"
                            type="date"
                            value={formattedDate}  // Use formattedDate as the value
                            onChange={(event) => setFormattedDate(event.target.value)}  // Update formattedDate on change
                          
                          />
                        </FormGroup>
                      </Col>
                      <Row>
                        <Button style={{ margin: "20px 0px 0px 54%", color: "black", height: "35px" }} color="info" onClick={handleSubmit}>OK</Button>
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
