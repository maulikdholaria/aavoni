import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Field, Input, SubmitBtn, Datepicker, Select } from 'react-formik-ui';
import * as Yup from 'yup';
import SearchQuestionsStyle from '../style/SearchQuestions.less';
import { GlobalMapping } from '../GlobalMapping';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formats: ['bold']
    };
    this.autocomplete = null;
    this.selectedLocation = '';
    this.formData = {fname: '', lname: '', email: '', phone: '', date: '', guests: '', budget: '', message: '', event_location: ''};
    this.eventLocationObject = {city: '', state: '', country: '', lat: 0.00, lng: 0.00};
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
        .email('Invalid email')
        .required('Required'),
      phone: Yup.string()
        .required('Required'),
      guests: Yup.string()
        .required('Required'),
      budget: Yup.string()
        .required('Required'),
      event_location: Yup.string()
        .required('Required')
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
    console.log(e.target.name);
    let event_location_elem = document.getElementById('event_location');
    event_location_elem.value = this.selectedLocation;
  }

  handleSubmit = (values) => {
    if(typeof values.date === "object")
      values.date = values.date.toISOString().split('T')[0];
    console.log(values);
    console.log(this.eventLocationObject);
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
              Answer just a few questions to find wedding professionals, all in one place.
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
                           <div>I need:</div>
                           
                           <ToggleButtonGroup value={formats} onChange={this.handleToggle.bind(this)} onBlur={this.handleBlur}>
                            {
                              GlobalMapping.listingEntity.map(cb => (
                                <ToggleButton key={cb.value}  value={cb.value}><img src={cb.logo}/>{cb.label}</ToggleButton>
                              ))
                            }
                          </ToggleButtonGroup>
                        </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                           <Input id="event_location" name="event_location" label="In" onBlur={this.handleBlur}/>
                        </Col>
                        
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                          <Select name='guests' label='Est. Guests' placeholder='Select...' onBlur={this.handleBlur}
                            options={[
                              { value: '0', label: 'Not Sure' },
                              { value: '1', label: '0-50' },
                              { value: '2', label: '51-100' },
                              { value: '3', label: '100-150' },
                              { value: '4', label: '151-200' },
                              { value: '5', label: '200+' }
                            ]}
                          />
                        </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> 
                          <Select name='budget' label='Approximate Budget' placeholder='Select...' onBlur={this.handleBlur}
                            options={[
                              { value: '0', label: 'Not Sure' },
                              { value: '1', label: '$0-$5,000' },
                              { value: '2', label: '$5,000-$10,000' },
                              { value: '3', label: '$10,000-$15,000' },
                              { value: '4', label: '$15,000-$20,000' },
                              { value: '5', label: '$20,000-$30,000' },
                              { value: '6', label: '$30,000-$40,000' },
                              { value: '7', label: '$40,000-$50,000' },
                              { value: '8', label: '$50,000-$75,000' },
                              { value: '9', label: '$75,000-$100,000' },
                              { value: '10', label: '$100,000-$200,000' },
                              { value: '11', label: '$200,000+' }
                            ]}
                          />
                        </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Datepicker name="date" label="Date" dateFormat="MMMM d, yyyy" onChange={this.handleBlur}/></Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="fname" label="First Name" autoComplete="name" onBlur={this.handleBlur}/> </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="lname" label="Last Name" autoComplete="name" onBlur={this.handleBlur}/> </Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="email" type="email" label="Email" autoComplete="email" onBlur={this.handleBlur}/></Col>
                        <Col lg={12} xl={12} md={12} sm={12} xs={12}> <Input name="phone" type="tel" label="Phone" autoComplete="tel" onBlur={this.handleBlur}/></Col>
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
