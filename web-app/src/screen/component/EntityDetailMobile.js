import React from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AspectRatio from 'react-aspect-ratio';
import Icon from '@material-ui/core/Icon';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SocialIcons from '../common/SocialIcons';
import 'react-aspect-ratio/aspect-ratio.css';
import EntityDetailStyle from '../../style/EntityDetail.less';
import { Config } from '../../Config';

class EntityDetailMobile extends React.Component {
  constructor(props) {
  	super(props);
  }

  render() {
  	const { data } = this.props;
  	const addressUrl = "http://maps.google.com/?q=" + data.address;
  	const plannerContactUrl = "/planner/contact/" + data.id;
  	var gMapURL = "https://maps.googleapis.com/maps/api/js?key=" + Config.googleMap.KEY + "&v=3.exp&libraries=geometry,drawing,places";
  	
  	const MyMapComponent = withScriptjs(withGoogleMap((props) =>
	  <GoogleMap
	    defaultZoom={12}
	    defaultCenter={{ lat: props.lat, lng: props.lng }}
	    defaultOptions={{
	      streetViewControl: false,
	      scaleControl: false,
	      mapTypeControl: false,
	      panControl: false,
	      zoomControl: false,
	      rotateControl: false,
	      fullscreenControl: false
    	}}
	  >
	    <Marker position={{ lat: props.lat, lng: props.lng }} />
	  </GoogleMap>
	))

  	return(
  	  <Container className="entity-details-mobile">
  		<Row noGutters={true}>
      		<Col xs={12} sm={12} md={12} lg={12} xl={12}> 
      			
      			<Carousel indicators={false} interval='3000'>
      			{data.images.map((image, index) => (
      				<Carousel.Item key={index}>
      					<AspectRatio ratio="4/3">
						    <img
						      src={image}
						      alt={image}
						      width="100%"
						    />
					    </AspectRatio>
					</Carousel.Item>
      			))}
      			</Carousel>
      			<div className="info">
	          	  <div className="name">{data.name}</div>
	          	  <div>{data.type}</div>
	          	  <div className="location"><Icon className="icon">location_on</Icon><span style={{verticalAlign: 'super'}}> {data.city}</span></div>
	          	  <SocialIcons plannerId={data.id} device="mobile" facebook={data.fb} instagram={data.instagram} pinterest={data.pinterest} site={data.website}/>
	          	  <hr />
	          	  <div className="about">{data.about}</div>
      			</div>
      			<a href={addressUrl} target="_blank">{data.address}</a>
      			<MyMapComponent
				  isMarkerShown
				  lat={data.lat}
				  lng={data.lng}
				  googleMapURL={gMapURL}
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div style={{ height: `400px` }} />}
				  mapElement={<div style={{ height: `100%` }} />}
				/>
				<Link className="contact" to={plannerContactUrl}>
      				<Button className="link-button" variant="primary" size="lg" block>Contact Now</Button>
      			</Link>
      		</Col>
      		<Col> </Col>
      	</Row>
      </Container>

  	);
  }
}

export default EntityDetailMobile;
