import React from 'react';
import { Container, Row, Col, Card, CardDeck, Button } from 'react-bootstrap';
import SearchApi from '../api/SearchApi';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sucess: false,
      data: {},
      errors: [],
      reason: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    const searchApi = new SearchApi();
    searchApi.getItems(response => {
      this.setState({
          sucess: response.sucess,
          data: response.data,
          errors: response.errors,
          reason: response.reason,
          isLoaded: true
      });
    });
  }

  render() {
    const { success, data, errors, response, isLoaded } = this.state;
    console.log(data);
    if (success) {
      return <div>Error: {errors[0].message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container fluid>
          <Row>
            <Col></Col>
            <Col md={10}>
                <Row>
                  {data.listings.map(listing => (
                    <Col key={listing.id} lg={6} xl={3}>
                      <Card key={listing.id}>
                        <Card.Body>
                          <Card.Img variant="top" src="images/1.jpg" height="250"/>
                          <Card.Title>{listing.createdBy.firstName}</Card.Title>
                          <Card.Text>
                            {listing.title}
                          </Card.Text>
                          <Button variant="primary">Rent at ${ listing.rent } </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Search;