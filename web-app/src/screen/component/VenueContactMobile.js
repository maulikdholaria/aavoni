import React from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import AspectRatio from 'react-aspect-ratio';
import Icon from '@material-ui/core/Icon';
import 'react-aspect-ratio/aspect-ratio.css';
import VenueDetailsStyle from '../../style/VenueDetails.less';


class VenueContactMobile extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
  	const { data } = this.props;
  	
	 
  	return(
  	  <Container className="venue-details">
  		<Row noGutters={true}>
      		<Col xs={12} sm={12} md={12} lg={12} xl={12}> 
      			
      			<Carousel indicators={false} controls={false} interval='3000'>
      			{data.images.map((image, index) => (
      				<Carousel.Item key={index}>
      					<AspectRatio ratio="4/3">
						    <img
						      className="venue-image"
						      src={image}
						      alt={image}
						      width="100%"
						    />
					    </AspectRatio>
					</Carousel.Item>
      			))}
      			</Carousel>
      			<div className="venue-info">
	          	  <div className="name">{data.name}</div>
	          	  <div>{data.type}</div>
	          	  <div className="location"><Icon className="icon">location_on</Icon><span> {data.address}</span></div>
	          	  <hr />
	          	  <div className="about">{data.about}</div>
      			</div>
      			
      			
      			<Button className="contact" variant="primary" size="lg" block>Send Message</Button>
      		</Col>
      		<Col> </Col>
      	</Row>
      </Container>

  	);
  }
}

export default VenueContactMobile;
