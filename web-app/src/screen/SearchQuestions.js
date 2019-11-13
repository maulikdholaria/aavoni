import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Field, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import SearchQuestionsStyle from '../style/SearchQuestions.less';
import { GlobalMapping } from '../GlobalMapping';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import SearchQuestionsApi from '../api/SearchQuestionsApi';

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formats: ['bold']
    };
    this.autocomplete = null;
    this.selectedLocation = '';
    this.formData = {fname: '', lname: '', email: '', phone: '', date: '', guests: '', budget: '', event_location: '', message: ''};
    this.eventLocationObject = {city: '', state: '', country: '', lat: 0.00, lng: 0.00};
    this.forCountry = (this.props.match.params.country.toUpperCase());
    this.msgPlaceholder = 'Tell us more about your wedding preferences. i.e. theme (romantic / vintage / modern / rustic), reception, music, food & drinks etc. Provide links to wedding materials you may have put together (Pinterest boards, Google Drive, Dropbox etc.)';

  }

  handleToggle(event, newFormats){
    this.setState({formats: newFormats});
  }

  getFormSchema = () => {
    return Yup.object().shape({
      fname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      lname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid Email'),
      phone: Yup.string()
        .required('Required'),
      guests: Yup.string()
        .required('Required'),
      budget: Yup.string()
        .required('Required'),
      event_location: Yup.string()
        .required('Required')
        .min(3, 'Valid Location Required')
    });
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace();
    this.selectedLocation = addressObject.formatted_address;
    

    const placeComponents = addressObject.formatted_address.split(",");
    if(placeComponents.length > 0) {
      this.eventLocationObject.city = placeComponents[0];
    }
    if(placeComponents.length > 1) {
      this.eventLocationObject.state = placeComponents[1];
      this.eventLocationObject.country = placeComponents[1];
    }
    if(placeComponents.length > 2) {
      this.eventLocationObject.country = placeComponents[2];
    }

    geocodeByAddress(addressObject.formatted_address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          //console.log('Success', latLng);
          this.eventLocationObject.lat = latLng.lat;
          this.eventLocationObject.lng = latLng.lng;
        }
      )
      .catch(error => console.error('Error', error));
  };

  handleBlur = (e) => {
    let event_location_elem = document.getElementById('event_location');
    event_location_elem.value = this.selectedLocation;
  }

  handleSubmit = (values) => {
    if(typeof values.date === "object")
      values.date = values.date.toISOString().split('T')[0];

    let searchQuestionValues = {...values, ...this.eventLocationObject};
    searchQuestionValues['service_needed'] = this.state.formats.slice(1);
    searchQuestionValues['forCountry'] = this.forCountry;
    
    const searchQuestionsApi = new SearchQuestionsApi();
    searchQuestionsApi.create(searchQuestionValues, response => {
      window.analytics.track('search_questions_submitted');
      this.props.history.push("/search-questions-confirmation");
    });
  }

  componentDidMount() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('event_location'),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect.bind(this));
  }

  render() {
    const { formats } = this.state;
    
    return(
      <Container fluid className="search-questions">
        <Row noGutters={true}>
          <Col xl={4} lg={2} md={2}></Col>
          <Col xl={4} lg={8} md={8} sm={12} xs={12}>
            <h1>
              Get personalized wedding professionals
            </h1>
            <p>
              Answer a few quick questions to get matched with wedding  professionals best suited to help you plan your dream wedding.
            </p>
            <div>

              <Formik
                initialValues={this.formData}
                validationSchema={this.getFormSchema}
                onSubmit={this.handleSubmit}
                render={({ errors, touched }) => (
                  
                    <Form className="form contact-form" mode='themed'>
                      <Row>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12} className='service-need-continer'> 
                           <div>I need</div>
                           
                           <ToggleButtonGroup value={formats} onChange={this.handleToggle.bind(this)} onBlur={this.handleBlur}>
                            {
                              GlobalMapping.listingEntity.map(cb => (
                                <ToggleButton key={cb.value}  value={cb.value}><img src={cb.logo}/>{cb.label}</ToggleButton>
                              ))
                            }
                          </ToggleButtonGroup>
                        </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                           <Input id="event_location" name="event_location" label="In" placeholder='Enter your wedding location...' onBlur={this.handleBlur}/>
                        </Col>
                        
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                          <Select name='guests' label='Est. Guests' placeholder='Select...' onBlur={this.handleBlur}
                            options={GlobalMapping.guestsRange}
                          />
                        </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                          <Select name='budget' label='Approximate Wedding Budget' placeholder='Select...' onBlur={this.handleBlur}
                            options={GlobalMapping['budgetRange_' + this.forCountry]}
                          />
                        </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="date" type="date" label="Date" onBlur={this.handleBlur}/></Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="fname" label="First Name" autoComplete="name" onBlur={this.handleBlur}/> </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="lname" label="Last Name" autoComplete="name" onBlur={this.handleBlur}/> </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="email" type="email" label="Email" autoComplete="email" onBlur={this.handleBlur}/></Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="phone" type="tel" label="Phone" autoComplete="tel" onBlur={this.handleBlur}/></Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Textarea name='message' label='Message (Recommended)' placeholder={this.msgPlaceholder} onBlur={this.handleBlur} rows="6"/> </Col>
                      </Row>
                        
                        <SubmitBtn className="link-button">SUBMIT</SubmitBtn>
                      
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

export default SearchQuestions;
