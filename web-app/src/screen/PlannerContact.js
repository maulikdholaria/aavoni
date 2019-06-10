import React from 'react';
import { Container, Row, Col, Carousel, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import store from '../redux-store/store';
import AspectRatio from 'react-aspect-ratio';
import Icon from '@material-ui/core/Icon';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { Formik } from 'formik';
import { Form, Input, SubmitBtn, Datepicker, Select, Textarea } from 'react-formik-ui';
import * as Yup from 'yup';
import SocialIcons from './common/SocialIcons';
import PlannersApi from '../api/PlannersApi';
import LeadsApi from '../api/LeadsApi';
import PlannerContactStyle from '../style/PlannerContact.less';



class PlannerContact extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  data: {},
  	  leadInfo: {fname: '', lname: '', email: '', phone: '', date: '', guests: '', budget: '', message: ''},
  	  formClass: 'show-form',
  	  showAlert: false
    };
  }

  addCurrentPlannerDetail(data) {
    return {
      type: 'ADD_CURRENT_PLANNER_DETAIL',
      data
    }
  }

  addCurrentPlannerLead(data) {
    return {
      type: 'ADD_CURRENT_PLANNER_LEAD',
      data
    }
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
	    .required('Required')
	});
  }

  handleSubmit = (values) => {
  	const { data } = this.state;
  	values.toUserId = data.id;

  	store.dispatch(this.addCurrentPlannerLead(values));
  	this.setState({leadInfo: values});

  	values.date = values.date.toISOString().split('T')[0];
  	const leadsApi = new LeadsApi();
  	leadsApi.plannerLeadCreate(values, response => {
      this.setState({
		leadInfo: values,
    	formClass: 'hide-form',
    	showAlert: true
      });
    });
  }

  componentDidMount() {
    const plannersApi = new PlannersApi();
    const currState = store.getState();
    
    if(!Array.isArray(currState.currentPlannerDetail) && currState.currentPlannerDetail.id == this.props.match.params.id) {
      this.setState({
        data: currState.currentPlannerDetail,
      });
      return;
    }
    plannersApi.get(this.props.match.params.id, response => {
      const responseData = response.data;
      store.dispatch(this.addCurrentPlannerDetail(responseData.data));
      this.setState({
        data: responseData.data
      });
    });
  }


  render() {
  	const { data, leadInfo, formClass, showToast, showAlert } = this.state;
  	const currState = store.getState();
  	var formLeadInfo  = leadInfo;
  	
  	if(!Array.isArray(currState.currentPlannerLead)) {
  		formLeadInfo = currState.currentPlannerLead;
  	}

  	return(
  	  <Container className='planner-contact' fluid>
  		<Row noGutters={true}>
      		<Col>
      			<div className="info-lead">
	      			<div className="info">
		          	  <div className="name">{data.name}</div>
		          	  <div>{data.type}</div>
		          	  <div className="location"><Icon className="icon">location_on</Icon><span> {data.address}</span></div>
		          	  <SocialIcons />
		          	  <hr />
	      			</div>
	      			<div>
	      				{showAlert && <Alert variant="dark">
	    					Message Sent
	  					</Alert>
	  					}
	      			</div>
	      			<div className={formClass}>
		      			<Formik
						      initialValues={formLeadInfo}
						      validationSchema={this.getFormSchema}
						      onSubmit={this.handleSubmit}
						      render={({ errors, touched }) => (
						      	
							        <Form className="form contact-form" mode='themed'>
							        	<Row>
							        		<Col lg={6} xl={6}> <Input name="fname" label="First Name" autoComplete="name"/> </Col>
							        		<Col lg={6} xl={6}> <Input name="lname" label="Last Name" autoComplete="name"/> </Col>
							        		<Col lg={6} xl={6}> <Input name="email" type="email" label="Email" autoComplete="email"/></Col>
							        		<Col lg={6} xl={6}> <Input name="phone" type="tel" label="Phone" autoComplete="tel"/></Col>
							        		<Col lg={12} xl={12}> <Datepicker name="date" label="Date" dateFormat="MM/dd/YYYY"/></Col>
							        		<Col lg={6} xl={6}> 
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
							        		</Col>
							        		<Col lg={6} xl={6}> 
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
							        		</Col>
							        		<Col lg={12} xl={12}>  <Textarea name='message' label='Message (Optional)' /> </Col>
							        	</Row>
							          	
					      		  		<SubmitBtn className="link-button">Send Message</SubmitBtn>
					      			  
							        </Form>
						        
						      )}
				    	/>
			    	</div>
		    	</div>
      		</Col>
      	</Row>
      </Container>

  	);
  }
}

export default PlannerContact;
