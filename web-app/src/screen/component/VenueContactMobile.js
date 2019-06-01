import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import Icon from '@material-ui/core/Icon';
import SocialIcons from '../common/SocialIcons';
import SocialIconsStyle from '../../style/SocialIcons.less';
import VenueContactStyle from '../../style/VenueContact.less';
import FormStyle from '../../style/Form.less';


class VenueContactMobile extends React.Component {
  constructor(props) {
  	super(props);
  }

  getFormSchema = () => {
    return Yup.object().shape({
	  firstName: Yup.string()
	    .min(2, 'Too Short!')
	    .max(50, 'Too Long!')
	    .required('Required'),
	  lastName: Yup.string()
	    .min(2, 'Too Short!')
	    .max(50, 'Too Long!')
	    .required('Required'),
	  email: Yup.string()
	    .email('Invalid email')
	    .required('Required'),
	  guests: Yup.string()
	    .required('Required'),
	  budget: Yup.string()
	    .required('Required')
	});
  }

  render() {
  	
  	const { data } = this.props;
  	
  	return(
  	  <Container className="venue-contact-mobile">
		<Row noGutters={true}>
  		<Col xs={12} sm={12} md={12} lg={12} xl={12}> 
  			<div className="venue-info">
          	  <div className="name">{data.name}</div>
          	  <div>{data.type}</div>
          	  <div className="location"><Icon className="icon">location_on</Icon><span> {data.address}</span></div>
          	  <SocialIcons />
          	  <hr />
  			</div>

  			<Formik
		      initialValues={{
		        firstName: '',
		        lastName: '',
		        email: '',
		        phone: '',
		        guests: '',
		        budget: '',
		        message: ''
		      }}
		      validationSchema={this.getFormSchema}
		      onSubmit={values => {
		        // same shape as initial values
		        console.log(values);
		      }}
		      render={({ errors, touched }) => (
		      	
			        <Form className="form venue-contact-form" mode='themed'>

			          	<Input name="firstName" label="First Name" />
			        	<Input name="lastName" label="Last Name" />
			          	<Input name="email" type="email" label="Email"/>
			          	<Datepicker name="date" label="Date" dateFormat="MM/dd/YYYY"/>
			            <Select name='guests' label='Est. Guests' placeholder='Select...'
				          options={[
				            { value: '0', label: 'Not Sure' },
				          	{ value: '1', label: '0-50' },
				          	{ value: '2', label: '51-100' },
				          	{ value: '3', label: '100-150' },
				          	{ value: '4', label: '151-200' },
				          	{ value: '5', label: '200+' }
				          ]}
					    />
					    <Select name='budget' label='Approximate Budget' placeholder='Select...'
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
					    <Textarea name='message' label='Message (Optional)' />
	      		  		<SubmitBtn className="link-button contact-button" >Contact Now</SubmitBtn>
	      			  
			        </Form>
		        
		      )}
		    />
  			
  			
  		</Col>
  		<Col> </Col>
      	</Row>
      </Container>
  	);
  }
}

export default VenueContactMobile;
