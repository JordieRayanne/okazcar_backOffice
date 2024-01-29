/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import {useState} from "react";
import axios from "axios";
import {useSignIn} from "react-auth-kit";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("")
  const [disable, setDisable] = useState(false)
  const signIn = useSignIn()
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    setDisable(true)
    const formInformation = new FormData(event.target)
    try {
      let response = await axios.post("https://okazcar.up.railway.app/utilisateur/login", formInformation)
      response = response.data
      if (response.hasOwnProperty('Data')) {
        signIn({
          token: response.Data.Token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: event.target.querySelector("[type=email]").value, username: response.Data.Username, image: response.Data.Image }
        });
        navigate("/admin/statistiques");
      } else {
        setDisable(false)
        setError(response.Error)
      }
    } catch (e) {
      setDisable(false)
      setError(e.toString())
    }

  }
  return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-black-50 mb-4">
                <big>Sign in with credentials</big>
              </div>
              {error !== "" && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleLogin} role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        name="email"
                        value="mahfitahiana@gmail.com"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value="okazcar"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button disabled={disable} className="my-4" color="purple" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
  );
};

export default Login;
