import * as React from 'react';
import "./ChattingBody.css";
import "./chatbox.css";
import { socket } from '../../../../services/SocketService';

export default class ChattingBody extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            message: ""
        }
    }

    componentDidMount() {
        
    }

    messageEvent = (e) => { this.setState({ message: e.target.value.trim() }); }

    sendMessage = () => {
        console.log("send?");
        socket.emit("write-message", {_id: this.props.group_info._id, message: this.state.message});
    }

    render() {
        let {userData, group_info} = this.props;
        return (
            <div className="chatting-body">
                <div id="chat">
                    <div className="chat-header">
                        {group_info.title}
                    </div>
                    <div id="msgBox">
                        {
                            group_info.contents.map((el,i) => (
                                <div className={userData._id == el.user_id ? "me" : "you"}>
                                    <div className="entete">
                                        <h2>{el.name}</h2>
                                        <span className={userData._id == el.user_id ? "blue" : "green"}></span>
                                        <h3  className="date">{el.created}</h3>
                                    </div>
                                
                                    <div className="message">{el.message}</div>
                                </div>
                            ))
                        }
                    </div> 
                    <div id="inputBox">
                        <input type="text" id="msg" autoComplete="off" onChange={this.messageEvent} onInput={this.messageEvent} />
                        <button id="btnSend" onClick={this.sendMessage}>ENTER</button>
                    </div>
                </div>
                <div className="group-info">
                    <h4>Clients</h4>
                    <div className="group-user">
                        <div className="u-img"></div>
                        <div className="green-dot"></div>
                    </div>
                    
                    <div className="group-user-add">
                        <i className="fas fa-plus"/>
                    </div>
                </div>
            </div>
        )
    }
}
