import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form, DropZone, SubmitBtn } from 'react-formik-ui';
import * as yup from 'yup';
import PlannersApi from '../api/PlannersApi';


class PlannerEditImages extends React.Component {
  constructor(props) {
  	super(props);  
    this.state = {
                  files1: [],
                  isUploaded: false
                 };
  }


  handleSubmit = (values) => {
    
    const plannersApi = new PlannersApi();
    const id = this.props.match.params.id;
    this.setState({
      files1: [],
      isUploaded: true
    });

    values.files1.forEach(function (file) {
      
      var data = new FormData();
      data.append('file', file);
      plannersApi.uploadImages(id, data, response => {
        
        var elements = document.getElementsByTagName("img");
        for(var i = 0; i<elements.length; i++){
          const element = elements[i];
          const attribute = element.getAttribute('alt');
          
          if(attribute != null && attribute == file.name) {
            element.parentNode.removeChild(element);
          }
        }         
      });
    });
  }

  

  render() {
    const {files1, isUploaded} = this.state;
    console.log(files1);
  	return(
  	  <Container fluid style={{padding:'15px 15px'}}>
  		<Row noGutters={true}>
      		<Col lg={3} xl={3}> </Col>
      		<Col xs={12} sm={12} md={12} lg={6} xl={6}>
          <div>
            {isUploaded && <Alert variant="dark">
              Images Uploaded
            </Alert>
            }
          </div>
	  			<Formik
            initialValues={{
              files1: files1
            }}
            onSubmit={this.handleSubmit}
            render={() => (
              <Form>

                <DropZone
                  name='files1'
                  label='File upload'
                  placeholder='Drop some files here'
                />
                <br/>
                <SubmitBtn className="link-button">UPLOAD</SubmitBtn>
              </Form>
            )}
          />
          <br/><br/><br/>
          <Link to={{pathname: "/wedding-planner/" + this.props.match.params.id}}>View Profile</Link>
          <br/><br/>
          <a target="_blank" href={`/api/planners/clear/images/${this.props.match.params.id}`}>Delete All Images</a>          
      		</Col>
      		<Col lg={3} xl={3}> </Col>
      	</Row>
      </Container>

  	);
  }
}

export default PlannerEditImages;
