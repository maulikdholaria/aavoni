import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Icon from '@mdi/react'
import { mdiFacebook, mdiInstagram, mdiPinterest, mdiLink } from '@mdi/js'
import LeadsApi from '../../api/LeadsApi';

class SocialIcons extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { plannerId, device } = this.props;    
    const website = e.target.parentElement.getAttribute('href');
    const leadsApi = new LeadsApi();
    leadsApi.plannerClickCreate({plannerId: plannerId, deviceType: device, website: website}, response => {
      
    });
  }

  render() {  
    const { size, facebook, instagram, pinterest, site } = this.props;
    return (
      <div className="social-icons">
        <a href={facebook} alt="facebook" target="_blank"><Icon path={mdiFacebook} className="icon" size={size}/></a>
        <a href={instagram} alt="instagram" target="_blank"><Icon path={mdiInstagram} className="icon" size={size}/></a>
        <a href={pinterest} alt="pinterest" target="_blank"><Icon path={mdiPinterest} className="icon" size={size}/></a>
        <a onClick={this.handleClick} href={site} alt="site" target="_blank"><Icon path={mdiLink} className="icon" size={size}/></a>
      </div>
    );
  }
}

SocialIcons.defaultProps = {
  size: '26',
  facebook: '#',
  instagram: '#',
  pinterest: '#',
  site: '#'
};

export default SocialIcons;
