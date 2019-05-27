import React from 'react';
import { Container, Row, Col, Card, CardDeck, Button } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import SearchStyle from '../style/Search.less'
import SearchApi from '../api/SearchApi';

class SearchVenue extends React.Component {
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

  getPriceRangeText(pricerange) {
    var pricerangetext = "";
    for (var i = 0; i < pricerange; i++) {
      pricerangetext += "$";
    }
    return pricerangetext;
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
                  {data.items.map(item => (
                    <Col key={item.id} lg={6} xl={3}>
                      <Card key={item.id} className="search-card">
                        <Card.Body className="body">
                          <Card.Img variant="top" src="images/1.jpg" height="250"/>
                          <Card.Title className="title">{item.name} - {item.id}</Card.Title>
                          <Card.Text className="location">
                            <Icon className="icon">location_on</Icon><span> {item.location}</span>
                          </Card.Text>
                          <Card.Text className="price">
                            Price Range: {this.getPriceRangeText(item.pricerange)}
                          </Card.Text>
                          
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

export default SearchVenue;
