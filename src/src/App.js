import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import MainPage from "./Routes/MainPage/MainPage";
import eventService from "./services/EventService";
import LoginPage from './Routes/LoginPage/LoginPage';
import SignupPage from './Routes/SignupPage/SignupPage';
import MyFrame from './MyFrame/MyFrame';
// import posed, { PoseGroup } from 'react-pose';
import {socket} from './services/SocketService';
import { clientMode } from './services/DataService';

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
      authed: false
    };
    
    switch(clientMode) {
      case "web":
        
        break;
      case "electron":
        window.db.checkIsLogin("App", {callback: (res) => {
          this.setState({authed: res.result ? true : false});
          socket.emit('login-check', res.result);
        }});
        break;
    }
   

    eventService.listenEvent('loginStatus', data => {
      this.setState({authed: data.authed});
    });
  }

  render() {
    return (
      <div className="App">
        
        <HashRouter>
          {/* {this.state.isPanorama ? null :  (<MyNewsBox/>)} */}
          { clientMode == "electron" ? <MyFrame/> : <></> }
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
