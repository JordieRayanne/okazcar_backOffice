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
import {useEffect, useState} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import {helper, plotChartData} from "../components/Helper/Helper";
import {useNavigate} from "react-router-dom";

const Index = () => {
  const [data, setData] = useState({})
  const token = useAuthHeader()
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      let response = await axios.get("https://okazcar.up.railway.app/stats", {
        headers: {
          "Authorization": token()
        }
      })
      response = response.data
      if (!helper(response, navigate))
        setData(response)
      })()
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  return (
    <div style={{width:"87%", marginLeft: "13%"}}>
      <Header cards={data.cardDatas} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Graphe des revenues</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {
                    data.revenuesParMois !== null && data.revenuesParMois !== undefined &&
                      <Line
                          data={plotChartData(data.revenuesParMois).datas()}
                          options={plotChartData(data.revenuesParMois).options}
                          getDatasetAtEvent={(e) => console.log(e)}
                      />
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Nombres de paramètres</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Paramètres</th>
                    <th scope="col">Valeurs</th>
                  </tr>
                </thead>
                <tbody>
                {data.parametres !== null && data.parametres !== undefined && Object.entries(data.parametres).map(([key, value]) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{value}</td>
                    </tr>
                ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
