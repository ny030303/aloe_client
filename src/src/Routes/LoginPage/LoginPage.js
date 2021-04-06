import * as React from 'react';
import "./LoginPage.css";
import svg from '../../assets/chat.svg';
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  gotoSignup = () => {
    // window.main.resize("toMain", {width:450, height:680, callback :(result)=> {}});
    this.props.history.push("/signup");
  }

  render() {

    return (
      <div className="login-page">
        <div className="logo" />
        <div className="login-form">
          <input className="uk-input" type="text" placeholder="이메일 또는 전화번호" />
          <input className="uk-input" type="password" placeholder="비밀번호" />
          <button className="uk-button uk-button-primary uk-width-1-1" style={{ "backgroundColor": "#1fab89" }}>로그인</button>

          {/* <label><input class="uk-checkbox" type="checkbox"/> 자동 로그인</label> */}
          <p className="go-to-signup">Don't have an account? <b onClick={this.gotoSignup}>Sign up</b></p>
        </div>
        <div className="login-back">
          <img src={svg} alt="chat" />
        </div>
        <div>
          <a href="http://127.0.0.1:54000/auth/naver"><span>네이버 아이디로 로그인</span></a>
          <a href="http://127.0.0.1:54000/auth/google"><span>구글 아이디로 로그인</span></a>
          <a href="http://127.0.0.1:54000/auth/kakao"><span>카카오 아이디로 로그인</span></a>
        </div>                                        
      </div>
    );
  };
};