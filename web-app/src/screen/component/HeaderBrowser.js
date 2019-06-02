import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderStyle from "../../style/Header.less";


class HeaderBrowser extends React.Component {
  constructor(props) {
  	super(props);
  }


  render() {
  	
  	const siteLogoUrl='site-assets/images/logo.png';
  	
  	return(
  	  <div className="site-header-mobile">
  	    <Container fluid>
	  	  <Row>
	  	    <Col xl={12} lg={12} md={12}>
	  	  	  <Link to="/">
	  	  	  	<img className="headerLogo" src={siteLogoUrl} width="100"/>
	  	  	  </Link>
	  	    </Col>
	  	  </Row>
	  	</Container>
	  </div>
  	);
  }
}

export default HeaderBrowser;
