import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn } from 'react-formik-ui';
import * as Yup from 'yup';
import store from '../redux-store/store';
import UsersApi from '../api/UsersApi';


class Dashboard extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  userInfo: {id: null, email: '', fname: '', lname: ''}
  	};
  }

  logout() {
    const usersApi = new UsersApi();
    usersApi.logout(response => {
      if(response.data.success == true) {
        this.props.history.push("/account");
      }
    });
  }


  componentDidMount() {
    const usersApi = new UsersApi();
  	usersApi.getLoggedInUser(response => {
      if(response.data.success == true) {
      	this.setState({userInfo: response.data.data});
      } else {
        this.props.history.push("/account");
      }
    });
  }
  
  render() {
  	const { userInfo } = this.state;
  	
  	return(
  	  <div style={{padding: 15 + 'px 0'}}>
	  	<Container>
	  	  <Row>
	  	    <Col xs={12} sm={12} md={3}></Col>
	  		  <Col xs={12} sm={12} md={6}>
    		
  			  	<Alert variant="dark" style={{textAlign: 'center'}}>
  	    		  Logged in as <strong>{userInfo.email}</strong>
              <br/>
              <Link to={{pathname: "account"}} onClick={this.logout}>Logout</Link>
  	  			</Alert> 
    	  		<Link to={{pathname: "manage-cc"}} >Manage Credit Card</Link>
	  		  </Col>
	  		  <Col xs={12} sm={12} md={3}></Col>
	  	  </Row>
	  	</Container>
  	  </div>

  	);
  }
}

export default Dashboard;
