import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Field, Input, SubmitBtn } from 'react-formik-ui';
import { Config } from '../Config';
import { GlobalMapping } from '../GlobalMapping';
import SearchQuestionsApi from '../api/SearchQuestionsApi';
import LeadsApi from '../api/LeadsApi';
import PlannersApi from '../api/PlannersApi';
import LeadPurchaseStyle from '../style/LeadPurchase.less';
import { StripeProvider, Elements, CardElement, injectStripe } from 'react-stripe-elements';

var plannerLeadPurchaseStripeToken = null;

class _CardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  checkCCValidation = (ev) => {
    if(ev.complete == true) {
      const source = this.props.stripe.createToken({type: 'card'});
      source
      .then(resp => {  
        console.log(resp);
        plannerLeadPurchaseStripeToken = resp.token.id;
        this.props.onChange();
      })
      .catch(function(err){
        console.log(err);
      });
    }
  }

  render() {
    return (
      <CardElement onChange={this.checkCCValidation}/>
    )
  }
}
const CardForm = injectStripe(_CardForm);

class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
        <Elements>
          <CardForm onChange={this.props.onChange}/>
        </Elements>
      
    )
  }
}

class PlannerLeadPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = (this.props.match.params.uuid.toLowerCase());
    this.state = {leadInfo: {budget: '', catering: '', city: '', country: '', createdAt: '', date: '', email: '', fname: '', forCountry: '', guests: '', id: '', lat: '', lname: '', lng: '', makeup: '', phone: '', photographer: '', planner: '', state: '', venue: '', plannerSold: 0},
                  plannerInfo: {name: '',about: '',email: '',phone: '',priceRange: '',fb: '',instagram: '',pinterest: '',website: '',address: '',marketCityId: ''},
                  leadPrice: 5.00,
                  formClass: 'lead-delivery-form show-form',
                  leadSoldClass: 'lead-sold-hide',
                  submitDisabled: true};
  }

  componentDidMount() {
    const leadsApi = new LeadsApi();
    leadsApi.plannerSearchLeadMatchGet(this.uuid, response => {
      if(response.data.success == true) {
        let budgetRangeMappingKey = 'budgetRange_' + response.data.data.search_question['forCountry'];
        
        const leadPrice = GlobalMapping[budgetRangeMappingKey][response.data.data.search_question['budget']]['midLimit'] * .002;
        response.data.data.search_question['guests'] = GlobalMapping['guestsRange'][response.data.data.search_question['guests']]['label'];
        response.data.data.search_question['budget'] = GlobalMapping[budgetRangeMappingKey][response.data.data.search_question['budget']]['label'];
        
        this.setState({
            leadInfo: response.data.data.search_question,
            leadPrice: leadPrice
        });
        const plannersApi = new PlannersApi();
        plannersApi.get(response.data.data.plannerId, response => {
          const responseData = response.data;
          this.setState({
            plannerInfo: responseData.data
          });
        });

        if(response.data.data.search_question['plannerSold'] != 0) {
          this.setState({
            formClass: 'hide-form',
            leadSoldClass: 'lead-sold-show'
          });
        }
      }
    });
  }

  handleSubmit = (values) => {
    console.log(values);
    console.log(plannerLeadPurchaseStripeToken);
  }

  enablePurchase = (e) => {
    this.setState({
      submitDisabled : false
    });
  }

  render() {
    const { leadInfo, plannerInfo, leadPrice, formClass, leadSoldClass, submitDisabled } = this.state;    
    console.log(this.state);
    return(
      <Container fluid className="planner-lead-purchase">
        <Row noGutters={true}>
          <Col xl={4} lg={2} md={2}></Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={12}>
            <h1>
              Thanks for showing interest in {leadInfo.fname}'s wedding
            </h1>
            <p>
              Upon purchase of the lead, full contact info will be delivered via email and/or text message.
            </p>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Row>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Name:</span> <span className="value">{leadInfo.fname} {leadInfo.lname}</span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Email:</span> <span className="value">{leadInfo.email} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Phone:</span> <span className="value">{leadInfo.phone} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Guests:</span> <span className="value">{leadInfo.guests} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Budget:</span> <span className="value">{leadInfo.budget} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Date:</span> <span className="value">{leadInfo.date} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Location:</span> <span className="value">{leadInfo.city}, {leadInfo.state} </span></Col>
                </Row>
              </Card.Body>
            </Card>
            <div className="charge"> <span className="label">Total:</span> <span className="value">${leadPrice}</span></div>
            <div className={leadSoldClass}>
                <h1>Sufficient number of planners expressed interest helping {leadInfo.fname}. 
                    Act faster next time if the wedding info matches your criteria.
                </h1>
            </div>
            <div className={formClass}>
              <Formik
                  enableReinitialize={true}
                  initialValues={plannerInfo}
                  onSubmit={this.handleSubmit}
                  render={({ errors, touched }) => (
                    
                      <Form className="form" mode='themed'>
                        <Input name="email" type="email" label="Email" autoComplete="email"/>
                        <Input name="phone" type="tel" label="Phone" autoComplete="tel"/>
                        <StripeProvider apiKey={Config.stripe.PUBLISHABLE_KEY}>
                          <Elements>
                            <CreditCardForm onChange={this.enablePurchase}/>
                          </Elements>
                        </StripeProvider>
                        <br/>
                        <SubmitBtn className="link-button purchase" disabled={submitDisabled}>Purchase</SubmitBtn>
                      </Form>
                    
                  )}
              />
            </div>
            
          </Col>
          <Col xl={4} lg={2} md={2}></Col>
        </Row>
      </Container>

    );
  }
}

export default PlannerLeadPurchase;
