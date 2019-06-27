import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn } from 'react-formik-ui';
import * as Yup from 'yup';
import store from '../redux-store/store';
import UsersApi from '../api/UsersApi';


class Account extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  isLoggedIn: false,
  	  userInfo: {id: null, email: '', fname: '', lname: ''}
  	};
  }

  addCurrentLoggedInUser(data) {
    return {
      type: 'ADD_CURRENT_LOGGEDIN_USER',
      data
    }
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
      	this.setState({isLoggedIn: true, userInfo: response.data.data});
      	store.dispatch(this.addCurrentLoggedInUser(response.data.data));
        this.props.history.push("/dashboard");
      }
    });
  }

  componentDidMount() {
    window.analytics.page('Account Page');
    const usersApi = new UsersApi();
  	usersApi.getLoggedInUser(response => {
      if(response.data.success == true) {
      	this.setState({isLoggedIn: true, userInfo: response.data.data});
      	store.dispatch(this.addCurrentLoggedInUser(response.data.data));
        this.props.history.push("/dashboard");
      }
    });
  }
  
  render() {
  	const { isLoggedIn, userInfo } = this.state;
  	
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
			  	<Alert variant="dark" style={{textAlign: 'center'}}>
	    		  Logged in as <strong>{userInfo.email}</strong>
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
