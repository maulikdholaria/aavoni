import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import store from '../redux-store/store';
import SearchQuestionDetailStyle from '../style/SearchQuestionDetail.less';

class SearchQuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchQuestionInfo: {budget: '', catering: '', city: '', country: '', createdAt: '', date: '', email: '', fname: '', forCountry: '', guests: '', id: '', lat: '', lname: '', lng: '', makeup: '', phone: '', photographer: '', photographer: '', state: '', venue: ''}};
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const currState = store.getState();
    if(!Array.isArray(currState.searchQuestionDetail)) {
      this.setState({searchQuestionInfo: currState.searchQuestionDetail});
    }
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
    const { searchQuestionInfo } = this.state;
    
    return(
      <Container fluid className="search-question-detail">
        <Row noGutters={true}>
          <Col xl={2} lg={2} md={2}></Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <Link to="" onClick={this.goBack}> &lt; Back to purchase </Link>
          </Col>
          <Col xl={2} lg={2} md={2}></Col>
        </Row>
        <Row noGutters={true}>
          <Col xl={2} lg={2} md={2}></Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <Row noGutters={true}>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="qi-elem">
                <b>Name:</b> {searchQuestionInfo.fname} {searchQuestionInfo.lname}
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="qi-elem">
                <b>Date:</b> {searchQuestionInfo.date}
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="qi-elem">
                <b>Location:</b> {searchQuestionInfo.city}, {searchQuestionInfo.state}
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="qi-elem">
                <b>Wedding Details:</b> {searchQuestionInfo.message}
              </Col>
            </Row>
          </Col>
          <Col xl={2} lg={2} md={2}></Col>
        </Row>
      </Container>

    );
  }
}

export default SearchQuestionDetail;
