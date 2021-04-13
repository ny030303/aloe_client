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
                <div className="chat-group-box">
                    <div className="chat-group-title">Title</div>
                    <div className="group-people-profile-wrap">
                        <div className="chat-group-img"/>
                        <div className="chat-group-img"/>
                        <div className="chat-group-img"/>
                    </div>
                   
                </div>
            </div>
        )
    }
}
