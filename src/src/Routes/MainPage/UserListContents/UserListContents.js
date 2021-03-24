import * as React from 'react';
import "./UserListContents.css";

export default class UserListContents extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="userListContents">
                <label for="main-search" className="main-search-label">
                    <i className="fas fa-search" />
                    <input id="main-search" type="text" className="main-search-input" placeholder="이름으로 검색" />
                </label>
                <div className="myprofile">
                    <div className="user-img" />
                    <div className="user-name">Test1</div>
                    <div className="user-memo">memo</div>
                </div>
                <div className="userList">
                    
                </div>
            </div>
        )
    }
}
