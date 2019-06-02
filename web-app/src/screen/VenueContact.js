import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import store from '../redux-store/store';
import VenueApi from '../api/VenueApi';
import VenueContactMobile from './component/VenueContactMobile'

class VenueContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sucess: false,
      data: {},
      errors: [],
      reason: null,
      isLoaded: false
    };
  }

  addCurrentVenueDetail(data) {
    return {
      type: 'ADD_CURRENT_VENUE_DETAIL',
      data
    }
  }

  getPriceRangeText(pricerange) {
    var pricerangetext = "";
    for (var i = 0; i < pricerange; i++) {
      pricerangetext += "$";
    }
    return pricerangetext;
  }

  componentDidMount() {
    const venueApi = new VenueApi();
    const currState = store.getState();
    
    if(!Array.isArray(currState.currentVenueDetail) && currState.currentVenueDetail.id == this.props.match.params.id) {
      this.setState({
        sucess: true,
        data: currState.currentVenueDetail,
        errors: [],
        reason: null,
        isLoaded: true
      });
      return;
    }
    venueApi.getVenue(this.props.match.params.id, response => {
      store.dispatch(this.addCurrentVenueDetail(response.data));
      this.setState({
          sucess: response.sucess,
          data: response.data,
          errors: response.errors,
          reason: response.reason,
          isLoaded: true
      });
    });
  }

  render() {
    const { success, data, errors, response, isLoaded } = this.state;
    if (success) {
      return <div>Error: {errors[0].message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <BrowserView>
		        <h1> This is rendered only in browser </h1>
		      </BrowserView>
		      <MobileView>
		        <VenueContactMobile data={data}/>
		      </MobileView>
		    </div>
      );
    }
  }
}

export default VenueContact;
