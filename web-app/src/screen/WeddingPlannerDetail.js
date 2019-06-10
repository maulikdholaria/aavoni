import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import store from '../redux-store/store';
import EntityDetailMobile from './component/EntityDetailMobile'
import EntityDetailBrowser from './component/EntityDetailBrowser'
import PlannersApi from '../api/PlannersApi';

class WeddingPlannerDetail extends React.Component {
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

  addCurrentPlannerDetail(data) {
    return {
      type: 'ADD_CURRENT_PLANNER_DETAIL',
      data
    }
  }

  componentDidMount() {
    const plannersApi = new PlannersApi();
    const currState = store.getState();
    
    if(!Array.isArray(currState.currentPlannerDetail) && currState.currentPlannerDetail.id == this.props.match.params.id) {
      this.setState({
        sucess: true,
        data: currState.currentPlannerDetail,
        errors: [],
        reason: null,
        isLoaded: true
      });
      return;
    }
    plannersApi.get(this.props.match.params.id, response => {
      const responseData = response.data;
      store.dispatch(this.addCurrentPlannerDetail(responseData.data));
      this.setState({
          sucess: responseData.sucess,
          data: responseData.data,
          errors: responseData.errors,
          reason: responseData.reason,
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
		        <EntityDetailBrowser data={data}/>
		      </BrowserView>
		      <MobileView>
		  	    <EntityDetailMobile data={data}/>
		      </MobileView>
		    </div>
      );
    }
  }
}

export default WeddingPlannerDetail;
