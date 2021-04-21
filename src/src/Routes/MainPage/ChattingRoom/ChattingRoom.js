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
            group_id: null
        };
       
    }

    componentDidMount() {
        eventService.listenEvent("openChattingRoom", (params) => {
            console.log(params);
            this.setState({group_id: params._id});
        });        
    }

    addGroupEvent = () => this.setState({nowShowPopupNum: 2});
    hidePopup = () => this.setState({nowShowPopupNum: -1});

    render() {
        return (
            <div className="chatting-room">
                {
                    this.state.group_id == null ? 
                    <ChattingStart/> : <ChattingBody/>
                }
            </div>
        )
    }
}
