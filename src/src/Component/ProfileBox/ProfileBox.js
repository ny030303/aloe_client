import * as React from 'react';
import "./ProfileBox.css";
import eventService from '../../services/EventService';

export default class ProfileBox extends React.Component {

    constructor(props) {
        super(props);
    }

    showChattingRoom = () => {
        eventService.emitEvent("openChatting", "test");
    }

    render() {
        return (
            <div className="profile-box " onClick={this.showChattingRoom}>
            <div className="user-img" />
            <div className="user-name">Name</div>
            <div className="user-memo">메모 칸</div>
        </div>
        )
    }
}
