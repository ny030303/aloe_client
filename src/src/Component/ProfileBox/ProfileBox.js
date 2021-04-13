import * as React from 'react';
import "./ProfileBox.css";
import eventService from '../../services/EventService';
import { serverLink } from '../../services/SocketService';

export default class ProfileBox extends React.Component {

    constructor(props) {
        super(props);
        //userData
    }

    // showChattingRoom = () => {
    //     eventService.emitEvent("openChatting", "test");
    // }

    render() {
        let image;
        if(this.props.userData)  image = serverLink + "images/"+ this.props.userData.profileURL;
        console.log(this.props.userData);
        return (
            <div className="profile-box ">
                <div className="user-img" style={this.props.userData ? {backgroundImage: `url(${image})`} : {}}/>
                <div className="user-name">{this.props.userData ? this.props.userData.name : ""}</div>
                <div className="user-memo">{this.props.userData ? this.props.userData.memo : ""}</div>
            </div>
        )
    }
}
