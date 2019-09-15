import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, PhoneInput, SubmitBtn, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import { GlobalMapping } from '../GlobalMapping';
import UsersApi from '../api/UsersApi';
import PlannersApi from '../api/PlannersApi';


class PlannerEdit extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  data: {
        name: '',
        about: '',
        email: '',
        phone: '',
        priceRange: '',
        fb: '',
        instagram: '',
        pinterest: '',
        website: '',
        address: '',
        marketCityId: ''
  	  }
    };
  }

  getFormSchema = () => { 
    return Yup.object().shape({
      name: Yup.string()
        .required('Required'),
      about: Yup.string()
        .required('Required'),
      phone: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      address: Yup.string()
        .required('Required'),
      marketCityId: Yup.string()
        .required('Required')
    });
  }

  handleSubmit = (values) => {
    values.phone = values.phone.replace(/[\(\)\s-]/g, "");
  	values.id = this.props.match.params.id;
    values['marketCountry'] = GlobalMapping['location'][values['marketCityId']-1]['marketCountry'];
    values['marketCity'] = GlobalMapping['location'][values['marketCityId']-1]['marketCity'];
  	const plannersApi = new PlannersApi();
  	plannersApi.edit(values, response => {
      if(response.data.success == true) {
        this.props.history.push("/planner/edit/images/" + this.props.match.params.id);
      }
    });
  }

  initialValues = (data) => {
    return {name: data.name == null? '':data.name,
            about: data.about == null? '':data.about,
            email: data.email == null? '':data.email,
            phone: data.phone == null? '':data.phone,
            priceRange: data.priceRange == null? '':data.priceRange,
            fb: data.fb == null? '':data.fb,
            instagram: data.instagram == null? '':data.instagram,
            pinterest: data.pinterest == null? '':data.pinterest,
            website: data.website == null? '':data.website,
            address: data.address == null? '':data.address,
            marketCityId: data.marketCityId == null? '':data.marketCityId};
  }

  componentDidMount() {
    window.analytics.page('Planner Edit');
    const usersApi = new UsersApi();
    usersApi.getLoggedInUser(response => {
      if(response.data.success == true) {
        const plannersApi = new PlannersApi();
        plannersApi.get(this.props.match.params.id, response => {
          const responseData = response.data;
          this.setState({
            data: responseData.data
          });
        });
      } else {
        this.props.history.push("/account");
      }
    });
  }

  render() {
    const { data } = this.state;
  	return(
  	  <Container fluid style={{padding:'15px 15px'}}>
  		<Row noGutters={true}>
      		<Col lg={3} xl={3}> </Col>
      		<Col xs={12} sm={12} md={12} lg={6} xl={6}>
	  			<Formik
	  			  enableReinitialize={true}
	  			  initialValues={this.initialValues(data)}
	  			  validationSchema={this.getFormSchema}
			      onSubmit={this.handleSubmit}
			      render={({ errors, touched }) => (
			      	
				        <Form className="form contact-form" mode='themed'>
				        	<Row>
  			        		<Col lg={6} xl={6}> <Input name="name" label="Name / Business Name"/> </Col>
  			        		<Col lg={12} xl={12}> <Textarea name='about' label='About' rows="10"/> </Col>
                    <Col lg={6} xl={6}> <Input name="email" type="email" label="Email (For lead delivery)" autoComplete="email"/></Col>
                    <Col lg={6} xl={6}> <PhoneInput name="phone" label="Cell (For lead notification)" autoComplete="tel" defaultCountry='us'/></Col>
                    <Col lg={8} xl={8}> <Select name="priceRange" label="priceRange" placeholder='Select...' options={GlobalMapping.priceRange} /> </Col>
  			        		<Col lg={8} xl={8}> <Input name="fb" label="Facebook Page"/> </Col>
  			        		<Col lg={8} xl={8}> <Input name="instagram" label="Instagram Page"/> </Col>
  			        		<Col lg={8} xl={8}> <Input name="pinterest" label="Pinterest Page"/> </Col>
  			        		<Col lg={8} xl={8}> <Input name="website" label="Website"/> </Col>
  			        		<Col lg={8} xl={8}> <Input name="address" label="Mailing/ Business Address/ City & State"/> </Col>
  			        		<Col lg={8} xl={8}> <Select name="marketCityId" label="Market City" placeholder='Select...' options={GlobalMapping.location} /> </Col>
							    </Row> 
		      		  	<SubmitBtn className="link-button">UPDATE & UOLOAD IMAGES</SubmitBtn>
				        </Form>
			        
			      )}
		    	/>	
      		</Col>
      		<Col lg={3} xl={3}> </Col>
      	</Row>
      </Container>

  	);
  }
}

export default PlannerEdit;
