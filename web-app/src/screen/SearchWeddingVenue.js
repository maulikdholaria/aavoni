import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, Button } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import store from '../redux-store/store';
import SearchVenueStyle from '../style/SearchVenue.less';
import SearchApi from '../api/SearchApi';

class SearchWeddingVenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sucess: false,
      totalVenues: 0,
      venues: {},
      errors: [],
      reason: null,
      isLoaded: false
    };
  }

  addCurrentSearchVenues(data) {
    return {
      type: 'ACC_CURRENT_SEARCH_VENUES',
      data
    }
  }

  getPriceRangeText(pricerange) {
    var pricerangetext = "";
    for (var i = 0; i < pricerange; i++) {
      pricerangetext += "$";
    }
    return pricerangetext;
  }

  updateState(response) {
    this.setState({
          sucess: response.sucess,
          totalVenues: response.data.totalVenues,
          venues: response.data.venues,
          errors: response.errors,
          reason: response.reason,
          isLoaded: true
    });
  }

  componentDidMount() {
    const searchApi = new SearchApi();
    const currState = store.getState();

    if(!Array.isArray(currState.venues)) {
      this.setState({
        sucess: true,
        totalVenues: currState.venues.totalVenues,
        venues: currState.venues.venues,
        errors: [],
        reason: null,
        isLoaded: true
      });
      return;
    }
    searchApi.searchVenue(response => {
      store.dispatch(this.addCurrentSearchVenues(response.data));
      this.setState({
          sucess: response.sucess,
          totalVenues: response.data.totalVenues,
          venues: response.data.venues,
          errors: response.errors,
          reason: response.reason,
          isLoaded: true
      });
    });
  }

  render() {
    const { success, venues, errors, response, isLoaded } = this.state;
    if (success) {
      return <div>Error: {errors[0].message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container className="search-venue" fluid>
          <Row>
            <Col></Col>
            <Col md={10}>
                <Row>
                  {venues.map(venue => (
                    <Col key={venue.id} lg={6} xl={3}>
                      <Link to={{pathname: `/venue/${venue.id}`}}>
                        <Card key={venue.id} className="search-card">
                          <Card.Body className="body">
                            <Card.Img variant="top" src="images/1.jpg" height="250"/>
                            <Card.Title className="title">{venue.name} - {venue.id}</Card.Title>
                            <Card.Text className="location">
                              <Icon className="icon">location_on</Icon><span> {venue.location}</span>
                            </Card.Text>
                            <Card.Text className="price">
                              Price Range: {this.getPriceRangeText(venue.pricerange)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
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

export default SearchWeddingVenue;
