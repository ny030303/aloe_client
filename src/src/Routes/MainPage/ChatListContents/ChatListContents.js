import * as React from 'react';
import ProfileBox from '../../../Component/ProfileBox/ProfileBox';
import "./ChatListContents.css";
import { socket } from '../../../services/SocketService';
import ChatlistGroupbox from './ChatlistGroupbox/ChatlistGroupbox';
import AddGroupPopup from '../../../Component/AddGroupPopup/AddGroupPopup';

export default class ChatListContents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            isShowPopup: false
        };

    }

    componentDidMount() {
        socket.emit("show-user-group");
        socket.on('show-user-group-ok', (data) => {
            console.log(data);
            this.setState({groupList: data});
        })
    }
    controllPopup = () => this.setState({isShowPopup: !this.state.isShowPopup});

    render() {
        return (
            <div className="chat-list-contents">
                <div className="chat-list-contents-title">Your Groups</div>
                {
                    this.state.groupList.map((g,i) => (<ChatlistGroupbox group={g} key={i}/>))
                }
                
                <div className="chatlist-addgroup-btn" onClick={this.controllPopup}>
                    <i class="fas fa-plus"></i>
                </div>

                {
                    this.state.isShowPopup ?  <AddGroupPopup hidePopup={this.controllPopup}/> : <></>
                }
            </div>
        )
    }
}
