import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
  } from "reactstrap";
  import React, { useState, useEffect } from 'react';
  

function ModeleList(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/modeles');
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

    return(
      <Card className="shadow">
      <CardHeader className="border-0">
        <h3 className="mb-0">Liste Modele</h3>
      </CardHeader>
      <div>
      
    </div>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Marque</th>
          <th scope="col">Date creation</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.nom}</td>
              <td>Marque 1</td>
              <td>{item.dateCreation}</td>
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                    style={{ backgroundColor: "purple" }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      style={{ color: "red" }}
                    >
                      Supprimer
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Modifier
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
      <CardFooter className="py-4">
        <nav aria-label="...">
          <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
          >
            <PaginationItem className="disabled">
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                tabIndex="-1"
              >
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="active">
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                2 <span className="sr-only">(current)</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      </CardFooter>
    </Card>
    );
}


export default ModeleList;