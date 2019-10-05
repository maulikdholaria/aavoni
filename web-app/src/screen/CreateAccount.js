import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, Select, SubmitBtn } from 'react-formik-ui';
import * as Yup from 'yup';
import { GlobalMapping } from '../GlobalMapping';
import UsersApi from '../api/UsersApi';
import PlannersApi from '../api/PlannersApi';
import PhotographersApi from '../api/PhotographersApi';

class CreateAccount extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {userCreated: false,
                  listingEntityCreated: false,
                  userId: 0,
                  listingEntityId: 0};
    this.listingEntityType = 0;                  
  }

  getFormSchema = () => { 
    return Yup.object().shape({});
  }

  handleSubmit = (values) => {
    this.listingEntityType = parseInt(values.listingEntityType);
    delete values.listingEntityType;

    values['country']=GlobalMapping['location'][values['marketCity']-1]['marketCountry'];
    delete values.marketCity;
    
    this.setState({
      userCreated: false,
      listingEntityCreated: false,
      userId: 0
    });

  	const usersApi = new UsersApi();
  	usersApi.create(values, response => {
      if(response.data.success == true) {
        const userId = response.data.data.id;
        this.setState({
          userCreated: true,
          userId: userId
        });

        switch(this.listingEntityType) {
          case 1:
            this.createPlanner({userId: userId, name: values.fname, email: values.email});
            break;
          case 3:
            console.log("creating photographer");
            this.createPhotographer({userId: userId, name: values.fname, email: values.email});
            break;
        }
      }
    });
  }

  createPlanner(valuesObj) {
    const plannersApi = new PlannersApi();
    plannersApi.create(valuesObj, response => {
      if(response.data.success == true) {
        this.setState({
          listingEntityCreated: true,
          listingEntityId: response.data.data.id
        });
      }
    });
  }

  createPhotographer(valuesObj) {
    const photographersApi = new PhotographersApi();
    photographersApi.create(valuesObj, response => {
      if(response.data.success == true) {
        this.setState({
          listingEntityCreated: true,
          listingEntityId: response.data.data.id
        });
      }
    });
  }

  getFormSchema = () => {
    return Yup.object().shape({
      fname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
      lname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      // password: Yup.string()
      //   .required('Required'),
      listingEntityType: Yup.string()
        .required('Required'),
      marketCity: Yup.string()
        .required('Required')
    });
  }

  componentDidMount() {
    const usersApi = new UsersApi();
    usersApi.getLoggedInUser(response => {
      if(response.data.success == true) {
        this.setState({isLoggedIn: true, userInfo: response.data.data});
      } else {
        this.props.history.push("/account");
      }
    });
  }

  render() {
    const { userCreated, userId, listingEntityCreated, listingEntityId } = this.state;
  	return(
  	  <Container fluid style={{padding:'15px 15px'}}>
  		<Row noGutters={true}>
      		<Col lg={3} xl={3}> </Col>
      		<Col xs={12} sm={12} md={12} lg={6} xl={6}>
          <div>
            {userCreated && <Alert variant="dark">
              Account Created - {userId}
            </Alert>
            }
          </div>
          <div>
            {listingEntityCreated && this.listingEntityType == 1 && <Alert variant="dark">
              <Link to={{pathname: "/planner/edit/" + listingEntityId}}> Planner Created - {listingEntityId} </Link>
            </Alert>
            }
            {listingEntityCreated && this.listingEntityType == 3 && <Alert variant="dark">
              <Link to={{pathname: "/photographer/edit/" + listingEntityId}}> Photographer Created - {listingEntityId} </Link>
            </Alert>
            }
          </div>
	  			<Formik
	  			  enableReinitialize={true}
	  			  initialValues={{fname: '', lname: '', email: '', password: '', listingEntityType: 1, marketCity:3}}
	  			  validationSchema={this.getFormSchema}
			      onSubmit={this.handleSubmit}
			      render={({ errors, touched }) => (
			      	
				        <Form className="form contact-form" mode='themed'>
				        	<Row>
  			        		<Col lg={6} xl={6}> <Input name="fname" label="First Name / Business Name"/> </Col>
  			        		<Col lg={6} xl={6}> <Input name="lname" label="Last Name"/> </Col>
                    <Col lg={12} xl={12}> <Input name="email" label="Email"/> </Col>
                    <Col lg={12} xl={12}> <Input name="password" label="Password"/> </Col>
                    <Col lg={12} xl={12}> <Select name="listingEntityType" label="Listing Entity" placeholder='Select...' options={GlobalMapping.listingEntity} /> </Col>
                    <Col lg={12} xl={12}> <Select name="marketCity" label='In' placeholder='Select...'
                    options={GlobalMapping.location}/></Col>
							    </Row> 
		      		  	<SubmitBtn className="link-button">CREATE</SubmitBtn>
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

export default CreateAccount;
