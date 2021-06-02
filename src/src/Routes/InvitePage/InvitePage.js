import * as React from 'react';
import "./InvitePage.css";
import {withRouter} from 'react-router-dom';
import eventService from '../../services/EventService';
import { serviceDB } from '../../services/DataService';
import svg from '../../assets/undraw_join_of2w.svg';
import { serverLink } from '../../services/SocketService';
import { Toast } from '../../services/SweetToast';
class InvitePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupInfo: {
        users: []
      }
    }

  }
  componentDidMount() {
    console.log(this.props.match.params);
    this.inviteInfo = {
      u_id: this.props.match.params.u_id,
      g_id: this.props.match.params.g_id
    };
    serviceDB.getAGroup("InvitePage", {g_id: this.inviteInfo.g_id, callback: (res)=> {
      console.log(res);
      this.setState({groupInfo: res});
    }});
    // if(this.props.authed === false) {
    //     eventService.emitEvent("showGuide", null);
    // localStorage.setItem("inviteInfo", JSON.stringify(inviteInfo));
    //     this.props.history.push("/login");
    // }
  }

  assignEvent = () => {
    console.log(this.props.authed);
    if(!this.props.authed) {
      // 로그인 x 
      localStorage.setItem("inviteInfo", JSON.stringify(this.inviteInfo));
      Toast.fire({
        icon: 'warning',
        title: '<b>로그인 후 <br> 그룹에 가입할 수 있습니다</b>'
      });
      this.props.history.push("/login");
    } else {
      // 본인의 초대장 or 이미 소속된 그룹일 경우 그룹 채팅창으로 이동
      // 아닌 경우 바로 쿼리로 그룹에 유저 추가
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      serviceDB.inviteUserToGroup("InvitePage", {data: {g_id: this.inviteInfo.g_id, u_id: userInfo._id}, callback: (res) => {
        console.log(res);
        if(res.result == 1) {
          Toast.fire({ icon: 'success', title: res.msg});
        } else {
          Toast.fire({ icon: 'error', title: res.msg});
        }
        this.props.history.push("/");
      }});
    }
  }

  render() {
    let {groupInfo} = this.state;
    let {params} = this.props.match;
    let invitingUser = groupInfo.users.find((el) => el._id == params.u_id) || {};
    return (
      <div className="invite-page">
        <div className="logo" />
        <div className="invite-body">
          <div className="inv-svg">
            <img src={svg} alt="inv"/>
          </div>
          <div className="group-title">
            <span>{groupInfo.title}</span> 그룹 초대장이 도착했습니다!
          </div>
          <div className="inv-group-users">
            <div className="u-img" style={{backgroundImage: `url(${invitingUser.profileURL ? serverLink + "images/" + invitingUser.profileURL : null})`}}/>
            <div className="inv-group-subtext">
              <b>{invitingUser.name}</b> 님 외 {groupInfo.users.length -1}명
            </div>
          </div>
          <button className="btn btn-success inv-btn" onClick={this.assignEvent}>수락</button>
        </div>
      </div>
    );
  };
};

export default withRouter(InvitePage);