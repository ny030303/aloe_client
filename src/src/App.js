import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import MainPage from "./Routes/MainPage/MainPage";
import eventService from "./services/EventService";
import LoginPage from './Routes/LoginPage/LoginPage';
import SignupPage from './Routes/SignupPage/SignupPage';
import MyFrame from './MyFrame/MyFrame';
// import posed, { PoseGroup } from 'react-pose';


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
          <MyFrame/>
          <Switch>
            <PrivateRoute exact authed={this.state.authed} path="/" component={MainPage}/>
            <LoginRoute exact authed={this.state.authed} path="/login" component={LoginPage}/>
            {/* <Route exact path="/login" component={LoginPage}/> */}
            <Route exact path="/signup" component={SignupPage}/>
            {/* <Route exact path="/" component={MainPage}/> */}
            
          </Switch>
          {/* {this.state.isPanorama ? null :  (<MyFooter/>)} */}
        </HashRouter>
      </div>
    );
  }
}

export default App;
