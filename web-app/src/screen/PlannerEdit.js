import React from 'react';
import { Container, Row, Col, Carousel, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AspectRatio from 'react-aspect-ratio';
import Icon from '@material-ui/core/Icon';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { Formik } from 'formik';
import { Form, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import SocialIcons from './common/SocialIcons';
import PlannersApi from '../api/PlannersApi';

import 'react-aspect-ratio/aspect-ratio.css';

class PlannerEdit extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  data: {
  	  	name: '',
  	  	about: '',
  	  	fb: '',
  	  	instagram: '',
  	  	pinterest: '',
  	  	website: '',
  	  	address: ''
  	  }
    };
  }

  getFormSchema = () => { 
    return Yup.object().shape({});
  }

  handleSubmit = (values) => {
  	values.id = this.props.match.params.id;
  	console.log(values);
  	const plannersApi = new PlannersApi();
  	plannersApi.edit(values, response => {
      
    });
  }

  componentDidMount() {
    const plannersApi = new PlannersApi();
    
    plannersApi.get(this.props.match.params.id, response => {
      const responseData = response.data;
      this.setState({
        data: responseData.data
      });
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
	  			  initialValues={{name: data.name,
	  							  about: data.about,
	  							  fb: data.fb,
	  							  instagram: data.instagram,
	  			  				  pinterest: data.pinterest,
	  			  				  website: data.website,
	  			  				  address: data.address}}
	  			  validationSchema={this.getFormSchema}
			      onSubmit={this.handleSubmit}
			      render={({ errors, touched }) => (
			      	
				        <Form className="form contact-form" mode='themed'>
				        	<Row>
				        		<Col lg={6} xl={6}> <Input name="name" label="Name / Business Name"/> </Col>
				        		<Col lg={12} xl={12}> <Textarea name='about' label='About' rows="10"/> </Col>
				        		<Col lg={8} xl={8}> <Input name="fb" label="Facebook Page"/> </Col>
				        		<Col lg={8} xl={8}> <Input name="instagram" label="Instagram Page"/> </Col>
				        		<Col lg={8} xl={8}> <Input name="pinterest" label="Pinterest Page"/> </Col>
				        		<Col lg={8} xl={8}> <Input name="website" label="Website"/> </Col>
				        		<Col lg={8} xl={8}> <Input name="address" label="Mailing/Business Address"/> </Col>
							</Row> 
		      		  		<SubmitBtn className="link-button">UPDATE</SubmitBtn>
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
