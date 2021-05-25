import * as React from 'react';
import "./InvitePage.css";
import {withRouter} from 'react-router-dom';
import eventService from '../../services/EventService';
class InvitePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

  }
  componentDidMount() {
    console.log(this.props.authed);
    if(this.props.authed === false) {
        eventService.emitEvent("showGuide", null);
        this.props.history.push("/login");
    }
  }
  checkAuthed = () => {
    
  }
  

  render() {

    return (
      <div className="invite-page">
        invite.
      </div>
    );
  };
};

export default withRouter(InvitePage);