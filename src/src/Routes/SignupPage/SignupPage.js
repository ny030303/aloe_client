import * as React from 'react';
import "./SignupPage.css";
import alertDialog from '../../services/AlertDialog/AlertDialog';
import { putUser } from '../../services/DataService';
import { fileToDataURL } from '../../services/CommonUtils';
export default class SignupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      idCheckText: "",
      pwd: "",
      pwdCheckText: "",
      name: "",
      nameCheckText: "",
      profileimg: null
    };
  }

  gotoBack = () => {
    window.main.resize("toMain", { width: 450, height: 560, callback: (result) => console.log('요청 후 결과 값 : ', result) });
    this.props.history.push("/");
  }

  signup = () => {
    const { state } = this;
    window.db.signup("signupPage", {
      userData: {
        id: state.id,
        pwd: state.pwd,
        name: state.name,
        profileimg: state.profileimg,
        memo: null
      }, callback: (result) => console.log('요청 후 결과 값 : ', result)
    });
    // if (Number(data.result) === 1) {
    //   alertDialog.show("회원가입 성공!", "정상적으로 회원가입 됐습니다.");
    //   this.props.history.push("/login");
    // } else {
    //   alertDialog.show("회원가입 실패!", "회원가입에 실패 했습니다.");
    // }
  }

  idEvent = (e) => { this.setState({ id: e.target.value.trim() }); }
  pwdEvent = (e) => { this.setState({ pwd: e.target.value.trim() }); }
  nameEvent = (e) => { this.setState({ name: e.target.value.trim() }); }

  changeUserProfileImg = (e) => {
    // this.showBgMenu();
    fileToDataURL(e.target.files[0]).then(res => {
      let canvas = document.createElement("canvas");
      canvas.setAttribute("width", 128);
      canvas.setAttribute("height", 128);
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.onload = () => {
        let rtSrc = { x: 0, y: 0, w: img.width, h: img.height };
        if (img.width > img.height) {
          rtSrc.w = img.height;
          rtSrc.x = 0;
        } else {
          rtSrc.h = img.width;
          rtSrc.y = 0;
        }
        // console.log(rtSrc);
        ctx.drawImage(img, rtSrc.x, rtSrc.y, rtSrc.w, rtSrc.h, 0, 0, 128, 128);
        this.setState({ profileimg: canvas.toDataURL() });
      };
      img.src = res;
    });
  };
  render() {
    const { gender, profileimg, idCheckText, pwdCheckText, nameCheckText } = this.state;
    return (
      <div className="signup-page">
        <div className="signup-header">
          <div className="signup-back" onClick={this.gotoBack}><i className="fas fa-chevron-left"></i></div>
          <h4>회원가입</h4>
        </div>
        <div className="signup-form">
          <div className="signupChangeProfileWrap">
            {
              (profileimg === null) ? (<div className="userProfileImg" />)
                : (<div className="userProfileImg" style={{ backgroundImage: `url(${profileimg})` }} />)
            }
              <div className="filebox">
                <label htmlFor="user_img_file" className="file-plus">
                  <i className="fas fa-plus"></i>
                </label>
                <input type="file" accept="image/*" id="user_img_file" onChange={this.changeUserProfileImg} />
              </div>
          </div>

          <div className="tf_required">계정 아이디</div>
          <input type="text" className="tf_g_feedInfo" placeholder="아이디 입력 (ex. asdf1234 ...)" maxLength="100"
            onChange={this.idEvent} onInput={this.idEvent} />
          <div className="tf_required">비밀번호</div>
          <input type="password" className="tf_g_feedInfo" placeholder="비밀번호" maxLength="100"
            onChange={this.pwdEvent} onInput={this.pwdEvent} />
          <p className="checkText">{pwdCheckText}</p>
          <input type="password" className="tf_g_feedInfo" placeholder="비밀번호 재입력" ref={this.rePwd} />

          <div className="tf_required">닉네임</div>
          <input type="text" className="tf_g_feedInfo" placeholder="닉네임을 입력해주세요." maxLength="200"
            onChange={this.nameEvent} onInput={this.nameEvent} />
          <p className="checkText">{nameCheckText}</p>
          <br /><br />
          <button className="uk-button uk-button-primary uk-width-1-1" style={{ "backgroundColor": "#1fab89" }}
            onClick={this.signup}>회원가입</button>

        </div>

        {/* <div className="signup-line-wrap">
          <hr /><p>간편 로그인</p><hr />
        </div> */}

      </div>
    );
  };
};