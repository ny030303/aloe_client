import * as React from 'react';
import "./ChatlistGroupbox.css";
import eventService from '../../../../services/EventService';

export default class ChatlistGroupbox extends React.Component {

    constructor(props) {
        super(props);

    }
    
    openGroupChattingRoom = () => {
        eventService.emitEvent("openChattingRoom", {"_id": this.props.group._id});
    }

    render() {
        return (
            <div className="chatlist-groupbox" onClick={this.openGroupChattingRoom}>
                <div className="chatlist-groupbox-title"><i className="fas fa-door-closed"></i> {this.props.group.title}</div>
                <div className="chatlist-groupbox-subtitle">4 hours ago.</div>
                {/* <div className="chatlist-groupbox-img-wrap">
                    <img className="chatlist-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                    <img className="chatlist-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                    <img className="chatlist-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                </div> */}
            </div>
        )
    }
}
