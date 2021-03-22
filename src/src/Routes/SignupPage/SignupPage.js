import * as React from 'react';
import "./SignupPage.css";
export default class SignupPage extends React.Component {

  constructor(props) {
    super(props);
  }

  gotoBack = () => {
    // window.main.resize("toMain", {width:900, height:700, callback :(result)=> console.log('요청 후 결과 값 : ',result)});
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="signup-page">
        <div className="signup-header">
            <div className="signup-back" onClick={this.gotoBack}><i class="fas fa-chevron-left"></i></div>
            {/* <h4>회원가입</h4> */}
        </div>
        <br/>
        <div className="signup-line-wrap">
            <hr/><p>간편 로그인</p><hr />
        </div>
        
      </div>
    );
  };
};