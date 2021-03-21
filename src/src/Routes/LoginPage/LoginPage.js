import * as React from 'react';
import alertDialog from '../../services/AlertDialog/AlertDialog';
import "./LoginPage.css";
import svg from '../../assets/chat.svg';
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="login-page">
        <div className="logo"/>
        <div className="login-form">
          <input className="uk-input" placeholder="이메일 또는 전화번호"/>
          <input className="uk-input" placeholder="비밀번호"/>
          <button className="uk-button uk-button-primary uk-width-1-1" style={{"backgroundColor": "#1fab89"}}>로그인</button>
        
          {/* <label><input class="uk-checkbox" type="checkbox"/> 자동 로그인</label> */}
          <p className="go-to-signup">Don't have an account? <b>Sign up</b></p>
        </div>
        <div className="login-back">
          <img src={svg} alt="chat"/>
        </div>
      </div>
    );
  };
};