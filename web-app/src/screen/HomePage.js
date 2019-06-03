import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import HomePageMobile from './component/HomePageMobile';
import HomePageBrowser from './component/HomePageBrowser'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
	return (
	  <div>
  	    <BrowserView>
          <HomePageBrowser />
      	</BrowserView>
      	<MobileView>
        	<HomePageMobile />
      	</MobileView>
    </div>
	);
  }
}

export default HomePage;