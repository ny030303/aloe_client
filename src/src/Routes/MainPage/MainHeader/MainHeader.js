import * as React from 'react';
import "./MainHeader.css";
import eventService from '../../../services/EventService';
import { serverLink, socket } from '../../../services/SocketService';
import { clientMode, serviceDB } from '../../../services/DataService';
import Swal from 'sweetalert2';

export default class MainHeader extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props);
    }

    logoutEvent = () => {
        socket.emit('logout');
        switch(clientMode) {
            case "web":
              serviceDB.logout("MainHeader", {callback: (res) => Swal.fire("메시지", res.result, "success")});
              break;
            case "electron":
                window.db.logout("MainHeader", {callback: (res) => Swal.fire("메시지", res.result, "success")});
              break;
          }
        
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
                        {
                            ["fa-user", "fa-comment-dots", "fa-user-plus", "fa-cog"].map((el,i) => (
                                <div className={((this.props.menuNum == i) ? "on " : "") + "main-header-menu-box"} key={i}
                                    data-num={i} onClick={this.props.changeMenuNum}>
                                    <i className={"fas "+ el} data-num={i} />
                                </div>
                            ))
                        }
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
