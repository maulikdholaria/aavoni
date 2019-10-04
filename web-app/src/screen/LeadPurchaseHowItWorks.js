import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchQuestionsConfirmationStyle from '../style/SearchQuestionsConfirmation.less';

class LeadPurchaseHowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return(
      <Container fluid className="search-questions-confirmation">
        <Row noGutters={true}>
          <Col xl={2} lg={2} md={2}></Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
          	<h1>
          		How it works?
          	</h1>
          	<Row>
          		<Col xl={4} lg={4} md={12} sm={12} xs={12} className='component-col'>
          			<img src='site-assets/images/icons/professionals.svg'/>
          			<p className='step'>Step 1</p>
          			<p>You are one of the qualified wedding professionals who is matched with couple's wedding preferences.</p>
          		</Col>
          		<Col xl={4} lg={4} md={12} sm={12} xs={12} className='component-col'>
          			<img src='site-assets/images/icons/acceptance.svg'/>
          			<p className='step'>Step 2</p>
          			<p>Check wedding preferences, location and date before making a lead purchase</p>
          		</Col>
          		<Col xl={4} lg={4} md={12} sm={12} xs={12} className='component-col'>
          			<img src='site-assets/images/icons/email-info.svg'/>
          			<p className='step'>Step 3</p>
          			<p>Contact wedding couple with your portfolio & distinct price offering.</p>
          		</Col>
          	</Row>
          </Col>
          <Col xl={2} lg={2} md={2}></Col>
        </Row>
      </Container>

    );
  }
}

export default LeadPurchaseHowItWorks;
