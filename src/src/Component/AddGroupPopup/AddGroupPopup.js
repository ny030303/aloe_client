import * as React from 'react';
import "./AddGroupPopup.css";

export default class AddGroupPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null
        };
    }

    titleEvent = (e) => { this.setState({ title: e.target.value.trim() });}

    

    render() {
        return (
            <div className="addgroup-popup">
               <div className="addgroup-popup-body">
                <h3>Add Group form</h3>
                <div className="addgroup-popup-form">
                    <input className="uk-input" type="text" placeholder="그룹 이름 작성" onChange={this.titleEvent} onInput={this.titleEvent} />
                    <button className="uk-button uk-button-primary " style={{"backgroundColor": "#1fab89"}} onClick={this.loginEvent}>등록</button>
                </div>
               </div>
            </div>
        )
    }
}
