import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import store from '../redux-store/store';
import SearchApi from '../api/SearchApi';
import SearchWeddingPlannerMobile from './component/SearchWeddingPlannerMobile';
import SearchWeddingPlannerBrowser from './component/SearchWeddingPlannerBrowser';

class SearchWeddingPlanner extends React.Component {
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
      type: 'ADD_CURRENT_WEDDING_PLANNERS_SEARCH',
      data
    }
  }

  componentDidMount() {
    const searchApi = new SearchApi();
    const currState = store.getState();

    if(!Array.isArray(currState.weddingPlanners)) {
      this.setState({
        sucess: true,
        totalPlanners: currState.weddingPlanners.totalPlanners,
        planners: currState.weddingPlanners.planners,
        errors: [],
        reason: null,
        isLoaded: true
      });
      return;
    }
    searchApi.searchWeddingPlanner(response => {
      store.dispatch(this.addCurrentWeddingPlannersSearch(response.data));
      this.setState({
          sucess: response.sucess,
          totalPlanners: response.data.totalPlanners,
          planners: response.data.planners,
          errors: response.errors,
          reason: response.reason,
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
            <SearchWeddingPlannerBrowser totalPlanners={totalPlanners} planners={planners}/>
          </BrowserView>
          <MobileView>
            <SearchWeddingPlannerMobile totalPlanners={totalPlanners} planners={planners}/>
          </MobileView>
        </div>
      );
    }
  }
}

export default SearchWeddingPlanner;
