import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, Button } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import store from '../../redux-store/store';
import SearchWeddingPlannerStyle from '../../style/SearchWeddingPlanner.less';
import SearchApi from '../../api/SearchApi';

class SearchWeddingPlannerBrowser extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }


  getPriceRangeText(pricerange) {
    var pricerangetext = "";
    for (var i = 0; i < pricerange; i++) {
      pricerangetext += "$";
    }
    return pricerangetext;
  }


  render() {
    const { totalPlanners, planners } = this.props;

    return (
      <Container className="search-wedding-planner" fluid>
        <Row>
          <Col></Col>
          <Col md={10} lg={10} xl={10}>
              <Row>
                {planners.map(planner => (
                  <Col key={planner.id} lg={3} xl={3}>
                    <Link to={{pathname: `/wedding-planner/${planner.id}`}} style={{ textDecoration: 'none' }}>
                      <Card key={planner.id} className="search-card">
                        <Card.Body className="body">
                          <Card.Img variant="top" src={planner.img} width="100%"/>
                          <Card.Title className="title">{planner.name} - {planner.id}</Card.Title>
                          <Card.Text className="location">
                            <Icon className="icon">location_on</Icon><span> {planner.location}</span>
                          </Card.Text>
                          <Card.Text className="price">
                            Price Range: {this.getPriceRangeText(planner.pricerange)}
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

export default SearchWeddingPlannerBrowser;