import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn } from 'react-formik-ui';
import * as Yup from 'yup';
import UsersApi from '../api/UsersApi';



class Account extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  isLoggedIn: false
  	};
  }

  
  getFormSchema = () => {
    return Yup.object().shape({
	  email: Yup.string()
	    .email('Invalid email')
	    .required('Required'),
	  password: Yup.string()
	    .required('Required')
	});
  }

  handleSubmit = (values) => {
  	const usersApi = new UsersApi();
  	usersApi.login(values, response => {
      if(response.data.success == true) {
      	this.setState({isLoggedIn: true});
      }
    });
  }

  componentDidMount() {
    const usersApi = new UsersApi();
  	usersApi.getLoggedInUser(response => {
      if(response.data.success == true) {
      	this.setState({isLoggedIn: true});
      }
    });
  }
  
  render() {
  	const { isLoggedIn } = this.state
  	return(
  	  <div style={{padding: 15 + 'px 0'}}>
	  	<Container>
	  	  <Row>
	  	    <Col xs={12} sm={12} md={4}></Col>
	  		<Col md={4}>
	  		  { !isLoggedIn && <Formik
	  		    initialValues={{email:'', password:''}}
	  		    validationSchema={this.getFormSchema}
				onSubmit={this.handleSubmit}
			    render={({ errors, touched }) => (
			      	
			      <Form className="form" mode='themed'>
			      	<Input name="email" label="Email" autoComplete="email"/>
			      	<Input name="password" type="password" label="Password" autoComplete="password"/>	
			      	<SubmitBtn className="link-button">LOGIN</SubmitBtn>
			      </Form>
			        
			    )}
			  />
			  }
			  { isLoggedIn && 
			  	<Alert variant="dark">
	    		  You are logged in
	  			</Alert>
	  		  }
	  		</Col>
	  		<Col xs={12} sm={12} md={4}></Col>
	  	  </Row>
	  	</Container>
  	  </div>

  	);
  }
}

export default Account;
