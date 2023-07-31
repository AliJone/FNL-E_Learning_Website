/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const data = [
    {
      thumbnail: 'https://example.com/image1.jpg',
      name: 'Product 1',
      price: '$50',
    },
    {
      thumbnail: 'https://example.com/image2.jpg',
      name: 'Product 2',
      price: '$100',
    },
    {
      thumbnail: 'https://example.com/image3.jpg',
      name: 'Product 3',
      price: '$75',
    },
    {
      thumbnail: 'https://example.com/image4.jpg',
      name: 'Product 4',
      price: '$120',
    },
    {
      thumbnail: 'https://example.com/image5.jpg',
      name: 'Product 5',
      price: '$150',
    },
    {
      thumbnail: 'https://example.com/image6.jpg',
      name: 'Product 6',
      price: '$200',
    },
  ];
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Courses Enrolled </CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Thumbnail</th>
                      <th>Name</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td className="text-center">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> 
      </div>
    </>
  );
}

export default Tables;
