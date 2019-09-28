import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const axios = require('axios');

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tc: ""};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get('site-assets/html/privacy_policy.html')
    .then(resp => {
      this.setState({tc: resp.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { tc } = this.state;
    const style = {margin: '30px 0'}
    return(
      <Container fluid style={style}>
        <Row noGutters={true}>
          <Col xl={2} lg={2} md={2}></Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <div dangerouslySetInnerHTML={{__html: tc }} />
          </Col>
          <Col xl={2} lg={2} md={2}></Col>
        </Row>
      </Container>        
      
    );
  }
}

export default PrivacyPolicy;
