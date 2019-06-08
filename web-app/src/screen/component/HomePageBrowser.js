import React from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import HomePageStyle from '../../style/HomePageStyle.less';
import FormStyle from '../../style/Form.less';
import { GlobalMapping } from '../../GlobalMapping';

class HomePageBrowser extends React.Component {
  constructor(props) {
  	super(props);
  }

  handleSubmit = (values) => {
    const whatUrlParam=GlobalMapping['modules'][values['what']-1]['urlParam'];
    const whereUrlParam=GlobalMapping['location'][values['where']-1]['marketCity'];
    this.props.history.push("/s/" + whatUrlParam + "/" + whereUrlParam);
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
  	  <div className="home-page-desktop">
	  	  
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
				      	
					        <Form className="form block2" mode='themed'>
				        	  <Row>
		        			    <Col md="5">
		        				  <Select name='what' label='I need help with' placeholder='Select...' options={GlobalMapping.modules} />
		        			    </Col>
		        			  	<Col md="5">
		        				  <Select name='where' label='In' placeholder='Select...' options={GlobalMapping.location} />
		        			  	</Col>
		        			  	<Col md="2">
		        			  	  <SubmitBtn className="link-button">Search</SubmitBtn>
		        			  	</Col>
				        	  </Row>
					        </Form>
				        
				      )}
				    />
				    <div className="block3">
				    	Join the amzing community to help people celebrate time of their life.
				    	<a href="https://forms.gle/LkqSoYkGVqnjr1HF6" target="_blank" style={{ textDecoration: 'none' }}> Become a vendor </a> 
				    	or 
				    	<a href="https://forms.gle/LkqSoYkGVqnjr1HF6" target="_blank" style={{ textDecoration: 'none' }}> Offer your venue </a>
			    	</div>
	      		</Col>
	      	</Row>
	      
      </div>

  	);
  }
}

export default withRouter(HomePageBrowser);
