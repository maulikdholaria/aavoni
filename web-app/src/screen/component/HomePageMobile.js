import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import HomePageStyle from '../../style/HomePageStyle.less';
import FormStyle from '../../style/Form.less';
import { GlobalMapping } from '../../GlobalMapping';

class VenueDetailsMobile extends React.Component {
  constructor(props) {
  	super(props);
  }

  handleSubmit = (values) => {
    const whatUrlParam=GlobalMapping['modules'][values['what']-1]['urlParam'];
    const whereUrlParam=GlobalMapping['location'][values['where']-1]['urlParam'];
    this.props.history.push("/" + whatUrlParam + "/" + whereUrlParam);
  }

  getFormSchema = () => {
    return Yup.object().shape({
	  what: Yup.string()
	   .required('Required'),
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
		        	'what': '',
		        	'where': ''
		      	  }}
			      validationSchema={this.getFormSchema} 
			      onSubmit={this.handleSubmit}
			      render={({ errors, touched }) => (
			      	
				        <Form className="form venue-contact-form" mode='themed'>

				          	<Select name='what' label='Need help with' placeholder='Select...'
					          options={GlobalMapping.modules}
						    />
						    <Select name='where' label='Where' placeholder='Select...'
					          options={GlobalMapping.location}
						    />
						    
		      		  		<SubmitBtn className="link-button">Search</SubmitBtn>
		      			  
				        </Form>
			        
			      )}
			    />
      		</Col>
      	</Row>
      </Container>

  	);
  }
}

export default withRouter(VenueDetailsMobile);
