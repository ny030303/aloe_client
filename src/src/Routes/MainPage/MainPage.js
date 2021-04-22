import * as React from 'react';
import "./MainPage.css";
import alertDialog from '../../services/AlertDialog/AlertDialog';
import ChatListContents from './ChatListContents/ChatListContents';
import UserListContents from './UserListContents/UserListContents';
import MainHeader from './MainHeader/MainHeader';
import eventService from '../../services/EventService';
import ChattingRoom from './ChattingRoom/ChattingRoom';
import { socket } from '../../services/SocketService';
import { clientMode } from '../../services/DataService';



export default class MainPage extends React.Component {
  // userData
  constructor(props) {
    super(props);
    this.state = {
      menuNum: 0,
      userData: null
    };
    this.w = 1525;
    this.h = 750;
    
    socket.on('login-ok', params => {
      this.setState({userData: params.user_data});
    });
  }

  componentDidMount() {
  }

  componentWillMount() {
    switch(clientMode) {
      case "web":
        
        break;
      case "electron":
        window.main.resize("toMain", {width: this.w, height: this.h, callback: (result) => {} });
        break;
    }
  }

  changeMenuNum = (e) => this.setState({ menuNum: e.target.dataset.num });

  render() {
    return (
      <div className="main-page page">
        <MainHeader menuNum={this.state.menuNum} changeMenuNum={this.changeMenuNum} userData={this.state.userData}/>
        <div className="content-wrap">
          {
            (this.state.menuNum == 0) ?
              (<UserListContents profileData={this.state.userData}/>) :
              (this.state.menuNum == 1) ?
                (<ChatListContents />) :
                (this.state.menuNum == 2) ?
                (<ChatListContents />) :
                (<ChatListContents />)
          }
          {/* --- chatting --- */}

          <ChattingRoom/>
        </div>
      </div>
    );
  };
};