import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, CardDeck, Button } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';

import VenueApi from '../api/VenueApi';

class VenueDetails extends React.Component {
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
    const venueApi = new VenueApi();
    venueApi.getVenue(this.props.match.params.id, response => {
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
    if (success) {
      return <div>Error: {errors[0].message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container fluid>
          
        </Container>
      );
    }
  }
}

export default VenueDetails;
