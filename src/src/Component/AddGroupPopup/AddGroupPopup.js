import * as React from 'react';
import $ from "jquery";
import "./AddGroupPopup.css";
import { socket } from '../../services/SocketService';

export default class AddGroupPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null
        };
    }

    componentDidMount() {
        let {hidePopup} = this.props;
        $('#addgroupPopup').modal();
        $('#addgroupPopup').on('hidden.bs.modal', function (e) {  setTimeout(() => {hidePopup()}, 100); });
    }

    titleEvent = (e) => { this.setState({ title: e.target.value.trim() });}
    

    editEvent = () => {
        let {hidePopup} = this.props;
        socket.emit('add-group', this.state.title);
        socket.on('add-group-ok', (res) => {
            if(res) {
                $('#addgroupPopup').modal('hide');
                setTimeout(() => {hidePopup()}, 100);
            }
        });
    };

    render() {
        return (
            <div className="addgroup-popup modal fade" id="addgroupPopup">
                <div className="modal-dialog">
                    <div className="modal-content" style={{padding: '34px'}}>
                        <h3>Add Group form</h3>
                        <div className="addgroup-popup-form">
                            <input className="uk-input" type="text" placeholder="그룹 이름 작성" onChange={this.titleEvent} onInput={this.titleEvent} />
                            <button className="uk-button uk-button-primary " style={{"backgroundColor": "#1fab89"}} onClick={this.editEvent}>등록</button> 
                            {/* data-dismiss="modal" */}
                        </div>
                    </div>
                </div>
               
               {/* <div className="addgroup-popup-body">
                
               </div> */}
            </div>
        )
    }
}
