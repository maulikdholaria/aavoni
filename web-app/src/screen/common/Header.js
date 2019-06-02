import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import HeaderMobile from '../component/HeaderMobile'
import HeaderBrowser from '../component/HeaderBrowser'

class Header extends React.Component {
  constructor(props) {
  	super(props);
  }
  
  render() {
  	
  	return (
	  <div>
	  	<BrowserView>
	  	  <HeaderBrowser/>
	  	</BrowserView>
	  	<MobileView>
	  	  <HeaderMobile/>
	  	</MobileView>
	  </div>
  	);
  }
}

export default Header;