import * as React from 'react';
import ProfileBox from '../../../Component/ProfileBox/ProfileBox';
import "./ChatListContents.css";

export default class ChatListContents extends React.Component {

    constructor(props) {
        super(props);
    }

    toast = () => {
        window.main.toast("toMain", {callback: (result) => {}});
    }

    render() {
        return (
            <div className="chat-list-contents">
                <button onClick={this.toast}>click toast</button>
            </div>
        )
    }
}
