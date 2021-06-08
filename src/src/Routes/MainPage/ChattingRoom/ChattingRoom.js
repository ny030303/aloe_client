import * as React from 'react';
import "./ChattingRoom.css";
import ChattingStart from './ChattingStart/ChattingStart';
import eventService from '../../../services/EventService';
import { socket } from '../../../services/SocketService';
import ChattingBody from './ChattingBody/ChattingBody';

export default class ChattingRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowShowPopupNum: -1,   // 1= meet people, 2= add group, 3= search, -1=none
            group_info: null
        };
       
    }

    componentDidMount() {
        eventService.listenEvent("openChattingRoom", (params) => {
            console.log(params);
            socket.emit("show-a-group", params._id);
        });
        // group 정보 가져오기
        socket.on("show-a-group-ok", (info) => {
            console.log(info);
            this.setState({group_info: info});
            
        });

        socket.on("new-message", (params) => {
            console.log("new-message in");
            console.log(params);
            if(params._id == this.state.group_info._id) {
                // contents 업데이트
                let newContentsArr = [...this.state.group_info.contents, params.message];
                let temp = Object.assign({}, this.state.group_info);
                temp.contents = newContentsArr;
                // 새로운 유저가 들어왔을 경우 그 유저 정보를 줘야 함.
                // group_info.users.find(v => v._id == el.user_id)
                this.setState({group_info: temp});
                console.log(temp);
            }
        });
    }

    addGroupEvent = () => this.setState({nowShowPopupNum: 2});
    hidePopup = () => this.setState({nowShowPopupNum: -1});

    render() {
        return (
            <div className="chatting-room">
                {
                    this.state.group_info == null ? 
                    <ChattingStart/> : <ChattingBody group_info={this.state.group_info} userData={this.props.userData}/>
                }
            </div>
        )
    }
}
