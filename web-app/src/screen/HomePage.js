import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import HomePageMobile from './component/HomePageMobile'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
	return (
	  <div>
  	    <BrowserView>
          <h1> This is rendered only in browser </h1>
      	</BrowserView>
      	<MobileView>
        	<HomePageMobile />
      	</MobileView>
    </div>
	);
  }
}

export default HomePage;