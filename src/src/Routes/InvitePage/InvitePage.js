import * as React from 'react';
import "./InvitePage.css";
import {withRouter} from 'react-router-dom';
import eventService from '../../services/EventService';
import { serviceDB } from '../../services/DataService';
import svg from '../../assets/undraw_join_of2w.svg';
class InvitePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupInfo: {}
    }

  }
  componentDidMount() {
    console.log(this.props.match.params);
    let inviteInfo = {
      u_id: this.props.match.params.u_id,
      g_id: this.props.match.params.g_id
    };
    serviceDB.getAGroup("InvitePage", {g_id: inviteInfo.g_id, callback: (res)=> {
      console.log(res);
      this.setState({groupInfo: res});
    }});
    // if(this.props.authed === false) {
    //     eventService.emitEvent("showGuide", null);
    // localStorage.setItem("inviteInfo", JSON.stringify(inviteInfo));
    //     this.props.history.push("/login");
    // }
  }
  checkAuthed = () => {
    
  }
  

  render() {
    let {groupInfo} = this.state;
    return (
      <div className="invite-page">
        <div className="invite-body">
          <div className="inv-svg">
            {/* join */}
            <img src={svg} alt="inv"/>
          </div>
          
          <div className="group-title">
            Please Join us "{groupInfo.title}"
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(InvitePage);