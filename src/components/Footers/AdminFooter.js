import {  Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="12">
          <div className="copyright text-center text-xl-center text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Okazcar
            </a>
          </div>
        </Col>

        <Col xl="12">
          <div className="text-muted d-flex justify-content-around mt-5 flex-row text-center">
            <p>ETU 1954</p>
            <p>ETU 2006</p>
            <p>ETU 2017</p>
            <p>ETU 1821</p>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
