import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import store from '../redux-store/store';
import EntityDetailMobile from './component/EntityDetailMobile'
import PlannerApi from '../api/PlannerApi';

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
    const plannerApi = new PlannerApi();
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
    plannerApi.get(this.props.match.params.id, response => {
      store.dispatch(this.addCurrentPlannerDetail(response.data));
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
		  	    <EntityDetailMobile data={data}/>
		      </MobileView>
		    </div>
      );
    }
  }
}

export default WeddingPlannerDetail;
