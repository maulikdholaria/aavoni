import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { StripeProvider, Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { Config } from '../Config';
import UsersApi from '../api/UsersApi';

class _CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isUpdated: false}
  }

  handleSubmit = (ev) => {
    
    if(ev.complete == true) {
      
      this.setState({
        isUpdated: true
      });
      
      const source = this.props.stripe.createSource({type: 'card'});
      source
      .then(function(resp){  
        const usersApi = new UsersApi();
        usersApi.editStripeSource({stripeSourceId: resp.source.id}, response => {});
      })
      .catch(function(err){
        console.log(err);
      });
    }
  }

  render() {
    const { isUpdated } = this.state;
    return (
      <Container fluid style={{padding:'40px 15px'}}>
        <Row noGutters={true}>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}> </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            {isUpdated && <Alert variant="dark">
              Credit Card Updated
              </Alert>
            }
            <CardElement onChange={this.handleSubmit}/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}> </Col>
        </Row>
      </Container>
     
    )
  }
}
const CardForm = injectStripe(_CardForm);

class CreditCardForm extends React.Component {
  render() {
    return (
      
        <Elements>
          <CardForm />
        </Elements>
      
    )
  }
}

class ManageCC extends React.Component {
  constructor(props) {
  	super(props);
  }

  componentDidMount(){
    window.analytics.page('Manage Credit Card');
  }

  render() {
    
  	return(
  	  <StripeProvider apiKey={Config.stripe.PUBLISHABLE_KEY}>
        <CreditCardForm />
      </StripeProvider>
  	);
  }
}

export default ManageCC;
