import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, DropZone, SubmitBtn } from 'react-formik-ui';
import PlannersApi from '../api/PlannersApi';


class PlannerEditImages extends React.Component {
  constructor(props) {
  	super(props);  	
  }


  handleSubmit = (values) => {
    
    const plannersApi = new PlannersApi();
    const id = this.props.match.params.id;
    values.files1.forEach(function (file) {
      console.log(file);
      var data = new FormData();
      data.append('file', file);
      plannersApi.uploadImages(id, data, response => {
        console.log(response);
      });
    });
  }

  

  render() {
  	return(
  	  <Container fluid style={{padding:'15px 15px'}}>
  		<Row noGutters={true}>
      		<Col lg={3} xl={3}> </Col>
      		<Col xs={12} sm={12} md={12} lg={6} xl={6}>
	  			<Formik
            initialValues={{
              files1: []
            }}
            onSubmit={this.handleSubmit}
            render={() => (
              <Form>

                <DropZone
                  name='files1'
                  label='File upload'
                  placeholder='Drop some files here'
                  withClearButton={true}
                />
                <SubmitBtn className="link-button">UPLOAD</SubmitBtn>
              </Form>
            )}
          />
          <br/><br/>
          <Link to={{pathname: "/wedding-planner/" + this.props.match.params.id}}>Planner {this.props.match.params.id}</Link>
          <br/>
          <br/>
          <br/>
          <a target="_blank" href={`/api/planners/clear/images/${this.props.match.params.id}`}>Clear Images - {this.props.match.params.id}</a>
      		</Col>
      		<Col lg={3} xl={3}> </Col>
      	</Row>
      </Container>

  	);
  }
}

export default PlannerEditImages;
