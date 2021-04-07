import * as React from 'react';
import "./LoginPage.css";
import svg from '../../assets/chat.svg';
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      pwd: null
    }
  }
  // window.main.resize("toMain", {width:450, height:680, callback :(result)=> {}});
  gotoSignup = () => this.props.history.push("/signup");
  idEvent = (e) => { this.setState({ id: e.target.value.trim() });}
  pwdEvent = (e) => { this.setState({ pwd: e.target.value.trim() });}


  loginEvent = () => {
    window.db.login("LoginPage", {userData: {email: this.state.id, password: this.state.pwd}, callback: (res) => {}});
  };

  render() {

    return (
      <div className="login-page">
        <div className="logo" />
        <div className="login-form">
          <input className="uk-input" type="text" placeholder="이메일 또는 전화번호" onChange={this.idEvent} onInput={this.idEvent} />
          <input className="uk-input" type="password" placeholder="비밀번호" onChange={this.pwdEvent} onInput={this.pwdEvent} />
          <button className="uk-button uk-button-primary uk-width-1-1" style={{"backgroundColor": "#1fab89"}} onClick={this.loginEvent}>로그인</button>
          
          <p className="go-to-signup">Don't have an account? <b onClick={this.gotoSignup}>Sign up</b></p>
        </div>
        <div className="login-back">
          <img src={svg} alt="chat" />
        </div>
        {/* <label><input class="uk-checkbox" type="checkbox"/> 자동 로그인</label> */}
        {/* <div>
          <a href="http://127.0.0.1:54000/auth/naver"><span>네이버 아이디로 로그인</span></a>
          <a href="http://127.0.0.1:54000/auth/google"><span>구글 아이디로 로그인</span></a>
          <a href="http://127.0.0.1:54000/auth/kakao"><span>카카오 아이디로 로그인</span></a>
        </div>  */}
      </div>
    );
  };
};