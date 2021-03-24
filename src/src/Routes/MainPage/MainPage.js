import * as React from 'react';
import alertDialog from '../../services/AlertDialog/AlertDialog';
import "./MainPage.css";
import UserListContents from './UserListContents/UserListContents';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.main.resize("toMain", { width: 700, height: 560, callback: (result) => {}});
    
  }

  render() {

    return (
      <div className="main-page page">
        <div className="main-header">
          <div className="main-menu">
            <div className="main-menu-top">
              <i className="fas fa-user on"/>
              <i className="fas fa-comment"/>
              <i className="fas fa-ellipsis-h"/>
            </div>
            <div className="main-menu-bottom">
              <i className="fas fa-bell"/>
              <i className="fas fa-cog"/>
            </div>
          </div>
          
        </div>
        <div className="content-wrap">
          <UserListContents/>
          
        </div>
        
        
      </div>
    );
  };
};