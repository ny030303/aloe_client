import * as React from 'react';
import "./MainHeader.css";
import alertDialog from '../../../services/AlertDialog/AlertDialog';
import eventService from '../../../services/EventService';
import { serverLink, socket } from '../../../services/SocketService';

export default class MainHeader extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props);
    }

    logoutEvent = () => {
        socket.emit('logout');
        window.db.logout("MainHeader", {callback: (res) => alertDialog.show("메시지", res.result)});
        eventService.emitEvent('loginStatus', {authed: false, userData: null});
    }

    render() {
        let {props} = this;
        let image;
        if(this.props.userData) image = serverLink + "images/"+ this.props.userData.profileURL;
        return (
            <div className="main-header">
                <div className="main-menu">
                    <div className="main-menu-top">
                        <div className="main-header-u">
                            <div className="main-header-u-img" style={this.props.userData ? {backgroundImage: `url(${image})`} : {}}/>
                            <div className="green-dot" />
                        </div>
                        <div className={((this.props.menuNum == 0) ? "on " : "") + "main-header-menu-box"}
                            data-num="0" onClick={this.props.changeMenuNum}>
                            <i className="fas fa-user" data-num="0" />
                        </div>
                        <div className={((this.props.menuNum == 1) ? "on " : "") + "main-header-menu-box"} 
                            data-num="1" onClick={this.props.changeMenuNum}>
                            <i className="fas fa-comment-dots" data-num="1" />
                        </div>
                        <div className={((this.props.menuNum == 2) ? "on " : "") + "main-header-menu-box"}
                            data-num="2" onClick={this.props.changeMenuNum}>
                            <i className="fas fa-user-plus" data-num="2" />
                        </div>
                        <div className={((this.props.menuNum == 3) ? "on " : "") + "main-header-menu-box"} 
                            data-num="3" onClick={this.props.changeMenuNum}>
                            <i className="fas fa-cog" data-num="3" />
                        </div>
                    </div>
                    <div className="main-menu-bottom">
                        <i className="fas fa-bell" />
                        <i className="fas fa-sign-out-alt" onClick={this.logoutEvent}/>
                    </div>
                </div>
            </div>
        )
    }
}
