import React from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import HeaderMobile from '../component/HeaderMobile'

class Header extends React.Component {
  constructor(props) {
  	super(props);
  }
  
  render() {
  	
  	return (
	  <div>
	  	<BrowserView>
	  	  
	  	</BrowserView>
	  	<MobileView>
	  	  <HeaderMobile/>
	  	</MobileView>
	  </div>
  	);
  }
}

export default Header;