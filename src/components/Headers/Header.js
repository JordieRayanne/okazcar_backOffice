import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {iconData} from "../../icon-data";

const Header = ({cards}) => {
  return (
    <>
      <div className="header bg-gradient-purple pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {cards !== undefined && cards !== null && Object.entries(cards).map(([key, value]) => (
                  <Col key={key} lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                            >
                              {key}
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                          {value}
                        </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className={iconData[key]}/>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
