import * as React from 'react';
import "./ChattingBody.css";
import "./chatbox.css";

export default class ChattingBody extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chatting-body">
                <div id="chat">
                    <div className="chat-header">
                        
                    </div>
                    <div id="msgBox">
                        <div className="you">
                            <div className="entete">
                                <h2>name</h2>
                                <span className="green"></span>
                                <h3  className="date">2010-03-04 00:00:00</h3>
                            </div>
                        
                            <div className="message">msg</div>
                        </div>
                        <div className="me">
                            <div className="entete">
                                <h2>name</h2>
                                <span className="blue"></span>
                                <h3  className="date">2010-03-04 00:00:00</h3>
                            </div>
                            <div className="message">msg</div>
                        </div>
                    </div> 
                    <div id="inputBox">
                        <input type="text" id="msg" autoComplete="off"/>
                        <button id="btnSend">ENTER</button>
                    </div>
                </div>
                <div className="group-info"></div>
            </div>
        )
    }
}
