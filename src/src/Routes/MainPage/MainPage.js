import * as React from 'react';
import alertDialog from '../../services/AlertDialog/AlertDialog';
import ChatListContents from './ChatListContents/ChatListContents';
import "./MainPage.css";
import UserListContents from './UserListContents/UserListContents';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuNum:0
    };
    
  }

  componentWillMount() {
    window.main.resize("toMain", { width: 400, height: 600, callback: (result) => {}});
    
  }

  changeMenuNum = (e) => { this.setState({menuNum: e.target.dataset.num})}

  render() {

    return (
      <div className="main-page page">
        <div className="main-header">
          <div className="main-menu">
            <div className="main-menu-top">
              <i className={((this.state.menuNum==0) ? "on " : "") + "fas fa-user"} 
              data-num="0" onClick={this.changeMenuNum}/>
              <i className={((this.state.menuNum==1) ? "on " : "") + "fas fa-comment"} 
              data-num="1" onClick={this.changeMenuNum}/>
              <i className={((this.state.menuNum==2) ? "on " : "") + "fas fa-ellipsis-h"} 
              data-num="2" onClick={this.changeMenuNum}/>
            </div>
            <div className="main-menu-bottom">
              <i className="fas fa-bell"/>
              <i className="fas fa-cog"/>
            </div>
          </div>
          
        </div>
        <div className="content-wrap">
          {
            (this.state.menuNum == 0) ? 
            (<UserListContents/>) :
            (this.state.menuNum == 1) ?
            (<ChatListContents/>) :
            (<UserListContents/>)
          }
        </div>
        
        
      </div>
    );
  };
};