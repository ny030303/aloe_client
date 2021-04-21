import * as React from 'react';
import ProfileBox from '../../../Component/ProfileBox/ProfileBox';
import "./ChatListContents.css";
import { socket } from '../../../services/SocketService';
import ChatlistGroupbox from './ChatlistGroupbox/ChatlistGroupbox';

export default class ChatListContents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: []
        };

    }

    componentDidMount() {
        socket.emit("show-user-group");
        socket.on('show-user-group-ok', (data) => {
            console.log(data);
            this.setState({groupList: data});
        })
    }

    render() {
        return (
            <div className="chat-list-contents">
                <div className="chat-list-contents-title">Your Groups</div>
                {
                    this.state.groupList.map((g,i) => (<ChatlistGroupbox group={g} key={i}/>))
                }
                
            </div>
        )
    }
}
