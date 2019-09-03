import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchQuestionsConfirmationStyle from '../style/SearchQuestionsConfirmation.less';

class SearchQuestionsConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
   
  }

  render() {
    return(
      <Container fluid className="search-questions-confirmation">
        <Row noGutters={true}>
          <Col xl={2} lg={2} md={2}></Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
          	<h1>
          		You're all set! Here's what happens next:
          	</h1>
          	<Row>
          		<Col xl={4} lg={4} md={12} sm={12} xs={12} className='component-col'>
          			<img src='site-assets/images/icons/professionals.svg'/>
          			<p className='step'>Step 1</p>
          			<p>We're contacting wedding professionals to see who's ready to talk now.</p>
          		</Col>
          		<Col xl={4} lg={4} md={12} sm={12} xs={12} className='component-col'>
          			<img src='site-assets/images/icons/acceptance.svg'/>
          			<p className='step'>Step 2</p>
          			<p>Only the first five available professionals will receive your info and should call soon.</p>
          		</Col>
          		<Col xl={4} lg={4} md={12} sm={12} xs={12} className='component-col'>
          			<img src='site-assets/images/icons/email-info.svg'/>
          			<p className='step'>Step 3</p>
          			<p>We'll also email you their info once they accept your request.</p>
          		</Col>
          	</Row>
          </Col>
          <Col xl={2} lg={2} md={2}></Col>
        </Row>
      </Container>

    );
  }
}

export default SearchQuestionsConfirmation;
