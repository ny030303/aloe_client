import * as React from 'react';
import alertDialog from '../../services/AlertDialog/AlertDialog';
import "./MainPage.css";
import FontAwesome from 'react-fontawesome';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
  }

  window_close = () => {
    window.main.send("toMain", {value:1234, key:'key', callback :(result)=> console.log('요청 후 결과 값 : ',result)});
  };

  render() {

    return (
      <div className="main-page page">
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">영어사전</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={this.window_close}>파파고</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">참여번역</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">지식백과</a>
          </li>
        </ul>
        </nav>
        <div className="container-sm d-flex p-3">
          <input className="uk-input" type="text"/>
          <button className="uk-button uk-button-primary ">Search</button>
        </div>
      </div>
    );
  };
};