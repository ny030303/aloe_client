import * as React from 'react';
import "./ProfileBox.css";

export default class ProfileBox extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="profile-box">
            <div className="user-img" />
            <div className="user-name">이름</div>
            <div className="user-memo">메모 칸</div>
        </div>
        )
    }
}
