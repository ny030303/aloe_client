import * as React from 'react';
import ProfileBox from '../../../Component/ProfileBox/ProfileBox';
import "./UserListContents.css";

export default class UserListContents extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="user-list-contents">
                <label htmlFor="main-search" className="main-search-label">
                    <i className="fas fa-search" />
                    <input id="main-search" type="text" className="main-search-input" placeholder="Search..." />
                </label>
                <div className="main-list-title">프로필</div>
                <ProfileBox/>
                <div className="main-list-title">친구(1)</div>
                <div className="userList">
                    <ProfileBox/>
                    <ProfileBox/>
                    <ProfileBox/>
                </div>
            </div>
        )
    }
}
