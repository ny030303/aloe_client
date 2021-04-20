import * as React from 'react';
import "./ChattingRoom.css";
import ChattingStart from './ChattingStart/ChattingStart';

export default class ChattingRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowShowPopupNum: -1,
        };
        // 1. meet people 2. add group 3. search
    }

    addGroupEvent = () => this.setState({nowShowPopupNum: 2});

    hidePopup = () => this.setState({nowShowPopupNum: -1});

    render() {
        return (
            <div className="chatting-room">
                <ChattingStart/>
            </div>
        )
    }
}
