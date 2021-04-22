import * as React from 'react';
import "./LoginPage.css";
import svg from '../../assets/chat.svg';
import alertDialog from '../../services/AlertDialog/AlertDialog';
import eventService from '../../services/EventService';
import { socket } from '../../services/SocketService';
import { clientMode } from '../../services/DataService';
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pwd: ""
    }

  }
  componentDidMount() {
    switch (clientMode) {
      case "web":

        break;
      case "electron":
        window.main.resize("toMain", { width: 450, height: 560, callback: (result) => { } });
        break;
    }
  }
  // window.main.resize("toMain", {width:450, height:680, callback :(result)=> {}});
  gotoSignup = () => this.props.history.push("/signup");
  idEvent = (e) => { this.setState({ id: e.target.value.trim() }); }
  pwdEvent = (e) => { this.setState({ pwd: e.target.value.trim() }); }


  loginEvent = () => {
    if (this.state.id != "" && this.state.pwd != "") {
      switch (clientMode) {
        case "web":

          break;
        case "electron":
          window.db.login("LoginPage", {
            id: this.state.id, pwd: this.state.pwd,
            callback: (res) => {
              // console.log(res);
              if (res.result.id) {
                alertDialog.show("메시지", "로그인 성공");
                eventService.emitEvent('loginStatus', { authed: true, userData: res.result });
                socket.emit('login', res.result);
              } else {
                alertDialog.show("로그인 실패", res.result);
              }
            }
          });
          break;
      }

    } else {
      alertDialog.show("로그인 실패", "값이 빈 부분이 있습니다.");
    }

  };

  render() {

    return (
      <div className="login-page">
        <div className="logo" />
        <div className="login-form">
          <input className="uk-input" type="text" placeholder="이메일 또는 전화번호" onChange={this.idEvent} onInput={this.idEvent} />
          <input className="uk-input" type="password" placeholder="비밀번호" onChange={this.pwdEvent} onInput={this.pwdEvent} />
          <button className="uk-button uk-button-primary uk-width-1-1" style={{ "backgroundColor": "#1fab89" }} onClick={this.loginEvent}>로그인</button>

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