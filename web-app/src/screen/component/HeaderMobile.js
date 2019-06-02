import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderStyle from "../../style/Header.less";


class HeaderMobile extends React.Component {
  constructor(props) {
  	super(props);
  }


  render() {
  	
  	const siteLogoUrl='site-assets/images/logo.png';
  	
  	return(
  	  <div className="site-header-mobile">
  	    <Container>
	  	  <Row>
	  	    <Col>
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

export default HeaderMobile;
