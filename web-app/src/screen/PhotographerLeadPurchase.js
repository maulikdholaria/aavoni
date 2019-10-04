import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Field, Input, SubmitBtn } from 'react-formik-ui';
import { Config } from '../Config';
import { GlobalMapping } from '../GlobalMapping';
import store from '../redux-store/store';
import SearchQuestionsApi from '../api/SearchQuestionsApi';
import LeadsApi from '../api/LeadsApi';
import PhotographersApi from '../api/PhotographersApi';
import LeadPurchaseStyle from '../style/LeadPurchase.less';
import { StripeProvider, Elements, CardElement, injectStripe } from 'react-stripe-elements';

var photographerLeadPurchaseStripeToken = null;

class _CardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  checkCCValidation = (ev) => {
    if(ev.complete == true) {
      const source = this.props.stripe.createToken({type: 'card'});
      source
      .then(resp => {  
        photographerLeadPurchaseStripeToken = resp.token.id;
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

class PhotographerLeadPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = (this.props.match.params.uuid.toLowerCase());
    this.state = {headerInfoClass: '',
                  leadInfo: {budget: '', catering: '', city: '', country: '', createdAt: '', date: '', email: '', fname: '', forCountry: '', guests: '', id: '', lat: '', lname: '', lng: '', makeup: '', phone: '', photographer: '', photographer: '', state: '', venue: '', photographerSold: 0},
                  leadMatchInfo: {}, 
                  photographerInfo: {name: '',about: '',email: '',phone: '',priceRange: '',fb: '',instagram: '',pinterest: '',website: '',address: '',marketCityId: ''},
                  leadPrice: 5.00,
                  leadPriceClass: 'lead-price show-element',
                  formClass: 'lead-delivery-form show-form',
                  spinnerClass: 'hide-spinner',
                  leadSoldClass: 'lead-sold-hide',
                  submitDisabled: true};
    this.leadsApi = new LeadsApi();
  }

  addSearchQuestionDetail(data) {
    return {
      type: 'ADD_SEARCH_QUESTION_DETAIL',
      data
    }
  }

  componentDidMount() {
    this.leadsApi.photographerSearchLeadMatchGet(this.uuid, response => {
      if(response.data.success == true) {
        let budgetRangeMappingKey = 'budgetRange_' + response.data.data.search_question['forCountry'];
        
        //const leadPrice = Math.max(2, Math.ceil(GlobalMapping[budgetRangeMappingKey][response.data.data.search_question['budget']]['midLimit'] * .0005));
        const leadPrice = 3;
        response.data.data.search_question['guests'] = GlobalMapping['guestsRange'][response.data.data.search_question['guests']]['label'];
        response.data.data.search_question['budget'] = GlobalMapping[budgetRangeMappingKey][response.data.data.search_question['budget']]['label'];
        
        store.dispatch(this.addSearchQuestionDetail(response.data.data.search_question));
        this.setState({
            leadInfo: response.data.data.search_question,
            leadPrice: leadPrice,
            leadMatchInfo: response.data.data.search_question_match
        });

        const photographersApi = new PhotographersApi();
        photographersApi.get(response.data.data.search_question_match.photographerId, response => {
          const responseData = response.data;
          this.setState({
            photographerInfo: responseData.data
          });
        });

        if(response.data.data.search_question_match['purchasedAt'] != null && response.data.data.search_question_match['purchasedAt'] != "") {
          this.setState({
            headerInfoClass: 'hide-header',
            formClass: 'hide-form',
            leadPriceClass: 'hide-element'
          });
        }

        if(response.data.data.search_question['photographerSold'] != 0) {
          this.setState({
            formClass: 'hide-form',
            leadSoldClass: 'lead-sold-show'
          });
        }
      }
    });
  }

  handleSubmit = (values) => {

    if(photographerLeadPurchaseStripeToken != null && photographerLeadPurchaseStripeToken != '') {
      this.setState({
        spinnerClass: 'show-spinner',
        formClass: 'hide-form'
      });
      const { leadInfo, leadMatchInfo, leadPrice } = this.state;
      this.leadsApi.photographerSearchLeadPurchase(
                  {'uuid': this.uuid,
                  'leadId': leadInfo['id'],
                  'leadMatchId': leadMatchInfo['id'],
                  'photographerId': values['id'],
                  'leadPrice': leadPrice,
                  'deliveryEmail': values['email'],
                  'deliveryPhone': values['phone'],
                  'stripePaymentToken': photographerLeadPurchaseStripeToken},
                  response => {
                    let budgetRangeMappingKey = 'budgetRange_' + response.data.data.search_question['forCountry'];
                    response.data.data.search_question['guests'] = GlobalMapping['guestsRange'][response.data.data.search_question['guests']]['label'];
                    response.data.data.search_question['budget'] = GlobalMapping[budgetRangeMappingKey][response.data.data.search_question['budget']]['label'];
        
                    this.setState({
                      headerInfoClass: 'hide-header',
                      spinnerClass: 'hide-spinner',
                      leadPriceClass: 'hide-element',
                      leadInfo: response.data.data.search_question
                    });
                  });
    }
  }

  enablePurchase = (e) => {
    this.setState({
      submitDisabled : false
    });
  }

  render() {
    const { headerInfoClass, leadInfo, photographerInfo, leadPrice, formClass, leadPriceClass, spinnerClass, leadSoldClass, submitDisabled } = this.state;    
    
    return(
      <Container fluid className="lead-purchase-screen">
        <Row noGutters={true}>
          <Col xl={4} lg={2} md={2}></Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={12}>
            <div className={headerInfoClass}>
              <h1>
                Thanks for showing interest in {leadInfo.fname}'s wedding
              </h1>
              <p>
                Full contact info will be available after purchase.
              </p>
              <p>
                <Link to={{pathname: `/lead-purchase-how-it-works`}} style={{ textDecoration: 'none' }}>How this works?</Link>
              </p>
            </div>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Row>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Name:</span> <span className="value">{leadInfo.fname} {leadInfo.lname}</span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Email:</span> <span className="value">{leadInfo.email} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Phone:</span> <span className="value">{leadInfo.phone} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Guests:</span> <span className="value">{leadInfo.guests} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Budget:</span> <span className="value">{leadInfo.budget} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                    <span className="label">Date:</span> 
                    <span className="value">
                      <Moment format="MMMM D, YYYY">
                        {leadInfo.date}
                      </Moment>
                    </span>
                  </Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> <span className="label">Location:</span> <span className="value">{leadInfo.city}, {leadInfo.state} </span></Col>
                  <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                    <span className="label">Wedding Details:</span> 
                    <span className="value"> <Link to={{pathname: `/search-question-detail/${leadInfo.id}`}} style={{ textDecoration: 'none' }}>View</Link></span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <div className={leadPriceClass}> <span className="label">Total:</span> <span className="value">${leadPrice}</span></div>
            <div className={leadSoldClass}>
                <h1>Sufficient number of photographers expressed interest helping {leadInfo.fname}. 
                    Act faster next time if the wedding info matches your criteria.
                </h1>
            </div>
            <div className={spinnerClass}>
              <Spinner animation="grow" />
              <p>Processing payment</p>
            </div>
            <div className={formClass}>
              <Formik
                  enableReinitialize={true}
                  initialValues={photographerInfo}
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

export default PhotographerLeadPurchase;
