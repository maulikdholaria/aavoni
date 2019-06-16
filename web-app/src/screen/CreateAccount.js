import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, Input, SubmitBtn } from 'react-formik-ui';
import * as Yup from 'yup';
import UsersApi from '../api/UsersApi';


class CreateAccount extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {created: false};
  }

  getFormSchema = () => { 
    return Yup.object().shape({});
  }

  handleSubmit = (values) => {
    this.setState({
      created: false
    });
  	const usersApi = new UsersApi();
  	usersApi.create(values, response => {
      if(response.data.success == true) {
        this.setState({
          created: true
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
      password: Yup.string()
        .required('Required')
    });
  }

  componentDidMount() {
    const usersApi = new UsersApi();
    usersApi.getLoggedInUser(response => {
      if(response.data.success == true) {
        this.setState({isLoggedIn: true, userInfo: response.data.data});
        store.dispatch(this.addCurrentLoggedInUser(response.data.data));
      } else {
        this.props.history.push("/account");
      }
    });
  }

  render() {
    const { created } = this.state;
  	return(
  	  <Container fluid style={{padding:'15px 15px'}}>
  		<Row noGutters={true}>
      		<Col lg={3} xl={3}> </Col>
      		<Col xs={12} sm={12} md={12} lg={6} xl={6}>
          <div>
            {created && <Alert variant="dark">
              Account Created
            </Alert>
            }
          </div>
	  			<Formik
	  			  enableReinitialize={true}
	  			  initialValues={{fname: '', lname: '', email: '', password: ''}}
	  			  validationSchema={this.getFormSchema}
			      onSubmit={this.handleSubmit}
			      render={({ errors, touched }) => (
			      	
				        <Form className="form contact-form" mode='themed'>
				        	<Row>
  			        		<Col lg={6} xl={6}> <Input name="fname" label="First Name / Business Name"/> </Col>
  			        		<Col lg={6} xl={6}> <Input name="lname" label="Last Name"/> </Col>
                    <Col lg={12} xl={12}> <Input name="email" label="Email"/> </Col>
                    <Col lg={12} xl={12}> <Input name="password" label="Password"/> </Col>
                    
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
