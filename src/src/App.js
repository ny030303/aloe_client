import React from 'react';
import './App.css';
import {HashRouter,BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import MainPage from "./Routes/MainPage/MainPage";
import eventService from "./services/EventService";
import LoginPage from './Routes/LoginPage/LoginPage';
import SignupPage from './Routes/SignupPage/SignupPage';
import MyFrame from './MyFrame/MyFrame';
// import posed, { PoseGroup } from 'react-pose';
import {socket} from './services/SocketService';
import { clientMode, serviceDB} from './services/DataService';
import InvitePage from './Routes/InvitePage/InvitePage';

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
        serviceDB.checkIsLogin("App", {callback: (res) => {
          this.setState({authed: res.result ? true : false});
          if(res.result) {
            socket.emit('login', res.result);
          }
          
        }});
        break;
      case "electron":
        window.db.checkIsLogin("App", {callback: (res) => {
          this.setState({authed: res.result ? true : false});
          if(res.result) {
            socket.emit('login', res.result);
          }
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
        
        <BrowserRouter>
          { clientMode == "electron" ? <MyFrame/> : <></> }
          <Switch>
            <PrivateRoute exact authed={this.state.authed} path="/" component={MainPage}/>
            <LoginRoute exact authed={this.state.authed} path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
            
            <Route exact path="/invite/:g_id/:u_id" render={() => <InvitePage authed={this.state.authed}/>}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
