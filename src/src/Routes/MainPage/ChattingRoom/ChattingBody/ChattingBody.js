import * as React from 'react';
import "./ChattingBody.css";
import "./chatbox.css";
import Swal from 'sweetalert2';
import { serverLink, socket } from '../../../../services/SocketService';

export default class ChattingBody extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            message: ""
        }
        this.msgBoxRef = React.createRef();
        this.msgInputRef = React.createRef();

        this.linkRef = React.createRef();
    }

    componentDidMount() {
        this.msgBoxRef.current.scrollTop = this.msgBoxRef.current.scrollHeight;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.contents !== this.props.group_info.contents) {
            this.msgBoxRef.current.scrollTop = this.msgBoxRef.current.scrollHeight;
        }
    }

    messageEvent = (e) => { this.setState({ message: e.target.value.trim() }); }

    sendMessage = () => {
        console.log("send?");
        this.msgInputRef.current.value = "";
        socket.emit("write-message", {_id: this.props.group_info._id, message: this.state.message});
    }

    copyEvent= () => {
        console.log("is click?");
        console.log(this.linkRef.current);
    }

    addGroupUserEvent = () => {
        Swal.fire({
            icon: 'info',
            title: 'Group 초대하기',
            text: '링크를 통해 그룹에 초대해 보세요!',
            footer: `<input class="form-control" value="${serverLink}group/adduser/${this.props.group_info._id}" ReadOnly/> <button class="btn btn-secondary">Copy</button>`
          }).then((result) => {
            console.log(result);
          });
        //   copyText.select();
        // document.execCommand("Copy");
    }

    render() {
        let {userData, group_info} = this.props;
        return (
            <div className="chatting-body">
                <div id="chat">
                    <div className="chat-header">
                        {group_info.title}
                    </div>
                    <div id="msgBox" ref={this.msgBoxRef}>
                        {
                            group_info.contents.map((el,i) => (
                                <div className={userData._id == el.user_id ? "me" : "you"} key={i}>
                                    <div className="entete">
                                        <h2>{group_info.users.find(v => v._id == el.user_id).name}</h2>
                                        <span className={userData._id == el.user_id ? "blue" : "green"}></span>
                                        <h3  className="date">{el.created}</h3>
                                    </div>
                                
                                    <div className="message">{el.message}</div>
                                </div>
                            ))
                        }
                    </div> 
                    <div id="inputBox">
                        <input type="text" id="msg" autoComplete="off" onChange={this.messageEvent} onInput={this.messageEvent} ref={this.msgInputRef}/>
                        <button id="btnSend" onClick={this.sendMessage}>ENTER</button>
                    </div>
                </div>
                <div className="group-info">
                    <h4>Clients</h4>
                    {
                        group_info.users.map((el, i) => (
                            <div className="group-user" key={i}>
                                <div className="u-img" style={{backgroundImage: `url(${serverLink}images/${el.profileURL})`}}/>
                                <div className="green-dot"/>
                            </div>
                        ))
                    }
                    
                    <div className="group-user-add" onClick={this.addGroupUserEvent}>
                        <i className="fas fa-plus"/>
                    </div>
                </div>
            </div>
        )
    }
}
