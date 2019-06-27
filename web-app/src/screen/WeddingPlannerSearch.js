import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import store from '../redux-store/store';
import SearchApi from '../api/SearchApi';
import WeddingPlannerSearchMobile from './component/WeddingPlannerSearchMobile';
import WeddingPlannerSearchBrowser from './component/WeddingPlannerSearchBrowser';

class WeddingPlannerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sucess: false,
      totalPlanners: 0,
      planners: [],
      errors: [],
      reason: null,
      isLoaded: false
    };
  }

  addCurrentWeddingPlannersSearch(data) {
    return {
      type: 'ADD_CURRENT_PLANNER_SEARCH',
      data
    }
  }

  componentDidMount() {
    window.analytics.page('Wedding Planner Search');
    const searchApi = new SearchApi();
    const currState = store.getState();

    if(!Array.isArray(currState.planners) && currState.planners.marketCity == this.props.match.params.marketCity) {
      this.setState({
        sucess: true,
        totalPlanners: currState.planners.totalPlanners,
        planners: currState.planners.planners,
        errors: [],
        reason: null,
        isLoaded: true
      });
      return;
    }
    searchApi.searchWeddingPlanner(this.props.match.params.marketCity, response => {
      const responseData = response.data;
      store.dispatch(this.addCurrentWeddingPlannersSearch(responseData.data));
      this.setState({
          sucess: responseData.sucess,
          totalPlanners: responseData.data.totalPlanners,
          planners: responseData.data.planners,
          errors: responseData.errors,
          reason: responseData.reason,
          isLoaded: true
      });
    });
  }

  render() {
    const { success, totalPlanners, planners, errors, response, isLoaded } = this.state;
    if (success) {
      return <div>Error: {errors[0].message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <BrowserView>
            <WeddingPlannerSearchBrowser totalPlanners={totalPlanners} planners={planners}/>
          </BrowserView>
          <MobileView>
            <WeddingPlannerSearchMobile totalPlanners={totalPlanners} planners={planners}/>
          </MobileView>
        </div>
      );
    }
  }
}

export default WeddingPlannerSearch;
