import * as React from 'react';
import "./LoginPage.css";
import svg from '../../assets/chat.svg';
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  gotoSignup = () => {
    // window.main.resize("toMain", {width:900, height:700, callback :(result)=> console.log('요청 후 결과 값 : ',result)});
    this.props.history.push("/signup");
  }

  render() {

    return (
      <div className="login-page">
        <div className="logo"/>
        <div className="login-form">
          <input className="uk-input" type="text" placeholder="이메일 또는 전화번호"/>
          <input className="uk-input" type="password" placeholder="비밀번호"/>
          <button className="uk-button uk-button-primary uk-width-1-1" style={{"backgroundColor": "#1fab89"}}>로그인</button>
        
          {/* <label><input class="uk-checkbox" type="checkbox"/> 자동 로그인</label> */}
          <p className="go-to-signup">Don't have an account? <b onClick={this.gotoSignup}>Sign up</b></p>
        </div>
        <div className="login-back">
          <img src={svg} alt="chat"/>
        </div>
      </div>
    );
  };
};