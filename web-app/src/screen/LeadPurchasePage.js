import React from 'react';
import { Config } from '../Config';
import PlannerLeadPurchase from './PlannerLeadPurchase';
import PhotographerLeadPurchase from './PhotographerLeadPurchase';

class LeadPurchasePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {stripePublishKey: null};
  }

  componentDidMount() {
    //console.log(Config.stripe.PUBLISHABLE_KEY);
    if (window.Stripe) {
      this.setState({stripePublishKey: Config.stripe.PUBLISHABLE_KEY});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripePublishKey: Config.stripe.PUBLISHABLE_KEY});
      });
    }
  }

  render() {
    const { stripePublishKey } = this.state;
    const uuid = this.props.match.params.uuid.toLowerCase();  
  	if(this.props.location.pathname.indexOf("/planner-lead-purchase") === 0 && stripePublishKey !== null) {
      return <PlannerLeadPurchase uuid={uuid} stripePublishKey={stripePublishKey}/>
    } else if(this.props.location.pathname.indexOf("/photographer-lead-purchase") === 0 && stripePublishKey !== null) {
      return <PhotographerLeadPurchase uuid={uuid} stripePublishKey={stripePublishKey}/>
    } else {
      return (<div></div>)
    }
  }
}

export default LeadPurchasePage;