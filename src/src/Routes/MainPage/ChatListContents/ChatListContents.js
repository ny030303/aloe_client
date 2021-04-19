import * as React from 'react';
import ProfileBox from '../../../Component/ProfileBox/ProfileBox';
import "./ChatListContents.css";

export default class ChatListContents extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chat-list-contents">
                <div className="chat-list-contents-title">Your Groups</div>
                <div className="chat-groupbox">
                    <div className="chat-groupbox-title">Group Title</div>
                     <div className="chat-groupbox-subtitle">4 hours ago.</div>
                    <div className="group-groupbox-img-wrap">
                        <img className="chat-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                        <img className="chat-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                        <img className="chat-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                    </div>
                </div>
                <div className="chat-groupbox">
                    <div className="chat-groupbox-title">Group Title</div>
                     <div className="chat-groupbox-subtitle">4 hours ago.</div>
                    <div className="group-groupbox-img-wrap">
                        <img className="chat-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                        <img className="chat-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                        <img className="chat-groupbox-img" src="http://localhost:54000/images/1617758018208.jpeg"/>
                    </div>
                </div>
            </div>
        )
    }
}
