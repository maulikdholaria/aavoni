import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import HomePageStyle from '../../style/HomePageStyle.less';
import FormStyle from '../../style/Form.less';
import { GlobalMapping } from '../../GlobalMapping';

class HomePageMobile extends React.Component {
  constructor(props) {
  	super(props);
  }

  handleSubmit = (values) => {
    const country = GlobalMapping['location'][values['where']-1]['marketCountry'];
    this.props.history.push("/search-questions/" + country.toLowerCase());
  }

  getFormSchema = () => {
    return Yup.object().shape({
	  where: Yup.string()
	   .required('Required')
	});
  }

  render() {
  	
  	return(
  	  <Container className="home-page-mobile">
  		<Row noGutters={true}>
      		<Col> 
      			<div className="block1">Amazing planners, exclusive venues, memorable experience & beyond</div>
      			<Formik
      			  initialValues={{
		        	'where': ''
		      	  }}
			      validationSchema={this.getFormSchema} 
			      onSubmit={this.handleSubmit}
			      render={({ errors, touched }) => (
			      	
				        <Form className="form block2" mode='themed'>
						    <Select name='where' label='My Wedding Location' placeholder='Select...'
					          options={GlobalMapping.location}
						    />
		      		  		<SubmitBtn className="link-button">Search</SubmitBtn>
				        </Form>
			        
			      )}
			    />
			    <div className="block3">
			    	Help people plan, organize, and celebrate the special day of their lives.
			    	<a href="https://forms.gle/LkqSoYkGVqnjr1HF6" target="_blank" style={{ textDecoration: 'none' }}> Become a vendor </a> 
			    	or 
			    	<a href="https://forms.gle/LkqSoYkGVqnjr1HF6" target="_blank" style={{ textDecoration: 'none' }}> Offer your venue </a>
			    	<div className="contact">Email: <a href="mailto:help@aavoni.com">help@aavoni.com</a></div>
			    </div>
      		</Col>
      	</Row>
      </Container>

  	);
  }
}

export default withRouter(HomePageMobile);
