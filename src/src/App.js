import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import MainPage from "./Routes/MainPage/MainPage";
import eventService from "./services/EventService";
// import posed, { PoseGroup } from 'react-pose';

const openDialog = () => {
  window.api.request("넘긴값", {
    value:1234, 
    key:'key', 
    calback :(result)=>{
    console.log('요청 후 결과 값 : ',result);
}});
};

const PrivateRoute = ({component: Component, authed, ...rest}) => (
  <Route
      {...rest}
      render={(props) =>
          (authed === true) ?
              (<Component {...props} />) :
              (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
      }/>
);

const LoginRoute = ({component: Component, authed, ...rest}) => (
  <Route
      {...rest}
      render={(props) =>
          (authed === true) ?
              (<Redirect to={{pathname: '/', state: {from: props.location}}}/>) :
              (<Component {...props} />)
      }/>
);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    };

    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.state.authed = this.userInfo ? true : false;
    // eventService.listenEvent('loginStatus', logined => this.setState({authed: logined}));
  }


  render() {
    return (
      <div className="App">
        <HashRouter>
          {/* {this.state.isPanorama ? null :  (<MyNewsBox/>)} */}

          <Switch>
            <Route exact path="/" component={MainPage}/>
            {/* <Route exact path="/edit" component={EditPage}/>
            <Route exact path="/search/:text" component={SearchResultPage}/>
            <Route exact path="/panorama/:type" component={PanoramaPage}/>
            <Route exact path="/writing/:writingId" component={WritingPage}/>
            <Route exact path="/wiki/:title" component={WritingPage}/>
            <Route exact path="/qna" component={QnaPage}/> */}
          </Switch>
          {/* {this.state.isPanorama ? null :  (<MyFooter/>)} */}
        </HashRouter>
      </div>
    );
  }
}

export default App;
