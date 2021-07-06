import * as React from 'react';
import "./ChattingBody.css";
import "./chatbox.css";
import Swal from 'sweetalert2';
import { serverLink, socket, clientLink } from '../../../../services/SocketService';
import TinyForm from '../../../../Component/TinyForm/TinyForm';

export default class ChattingBody extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            message: "",
            formHeight: 130,
            isLineOn: false
        }
        this.msgBoxRef = React.createRef();
        // this.msgInputRef = React.createRef();
        this.inputFormRef = React.createRef();

        this.linkRef = React.createRef();
    }

    componentDidMount() {
        this.msgBoxRef.current.scrollTop = this.msgBoxRef.current.scrollHeight;

        var doc = document, main = this.inputFormRef.current, y, dy;

        var startResize = function(evt) {
            y = evt.screenY;
        };

        var resize = (evt) => {
            dy = evt.screenY - y;
            y = evt.screenY;
            this.setState({formHeight: this.state.formHeight - dy});
            // ht -= dy;
            main.style.height = this.state.formHeight + "px";
        };

        document.querySelector(".resizeLine").addEventListener("mousedown", function(evt) {
            startResize(evt);
            doc.body.addEventListener("mousemove", resize);
            doc.body.addEventListener("mouseup", function() {
                doc.body.removeEventListener("mousemove", resize);
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.contents !== this.props.group_info.contents) {
            this.msgBoxRef.current.scrollTop = this.msgBoxRef.current.scrollHeight;
        }
    }

    messageEvent = (e) => { this.setState({ message: e.target.value.trim() }); }

    sendMessage = (message) => {
        console.log("send?");
        // this.msgInputRef.current.value = "";
        // socket.emit("write-message", {_id: this.props.group_info._id, message: this.state.message});
        console.log(escape(message));
        socket.emit("write-message", {_id: this.props.group_info._id, message: escape(message)});
    }

    copyEvent= () => {
        console.log("is click?");
        console.log(this.linkRef.current);
    }

    addGroupUserEvent = () => {
        Swal.fire({
            icon: 'info',
            title: 'Group 초대하기',
            showCancelButton: true,
            confirmButtonText: `Copy`,
            text: '링크를 통해 그룹에 초대해 보세요!',
            html: `<input class="form-control" value="${clientLink}invite/${this.props.group_info._id}/${this.props.userData._id}" id="links" ReadOnly/>`
          }).then((result) => {
            if(result.isConfirmed) {
                document.querySelector("#links").select();
                document.execCommand("Copy");
            }
          });
    }

    showUserInfo = (el) => {
        Swal.fire({
            // imageUrl: `${serverLink}images/${el.profileURL}`,
            // imageHeight: 300,
            // imageAlt: 'A image'
            html: ` <div class="card" style="height: 330px; padding: 20px; border: 0px;">
                        <div class="click-user-img" style="background-image: url(${serverLink}images/${el.profileURL})"></div>
                        <p class="title">${el.name}</p>
                        <div>${this.props.group_info.title}</div>
                    </div>
                    `,
            confirmButtonText: `Send Message`,
            denyButtonText: `Don't save`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
        });
                  
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
                                
                                    <div className="message" dangerouslySetInnerHTML={ {__html: unescape(el.message)} }></div>
                                </div>
                            ))
                        }
                    </div> 
                    <div id="inputBox" style={{height: this.state.formHeight}} ref={this.inputFormRef}>
                        <div className="resizeLine"/>
                        <TinyForm sendMessage={this.sendMessage}/>
                        {/* <input type="text" id="msg" autoComplete="off" onChange={this.messageEvent} onInput={this.messageEvent} ref={this.msgInputRef}/> */}
                        {/* <button id="btnSend" onClick={this.sendMessage}>ENTER</button> */}
                    </div>
                </div>
                <div className="group-info">
                    <h4>Clients</h4>
                    {
                        group_info.users.map((el, i) => (
                            <div className="group-user" key={i} onClick={() => this.showUserInfo(el)}>
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
