import * as React from 'react';
import "./ChattingStart.css";
import AddGroupPopup from '../../../../Component/AddGroupPopup/AddGroupPopup';

export default class ChattingStart extends React.Component {

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
            <>
                <div className="chatting-start">
                    <h3 className="chatting-start-title">Welcome!</h3>
                    <h3 className="chatting-start-subtitle">그룹을 만들고 사람들을 모아 대화해보세요.</h3>
                    <div className="uk-child-width-1-2@s uk-grid-match chatting-start-boxbtn-wrap">
                        
                        <div >
                            <div className="uk-card uk-card-default uk-card-hover uk-card-body" >
                                <h3 className="uk-card-title">Meet People</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div onClick={this.addGroupEvent}>
                            <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light" style={{backgroundColor: "#29b593"}}>
                                <h3 className="uk-card-title">Add Group</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div>
                            <div className="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                                <h3 className="uk-card-title">Search</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="chatting-start-boxbtn-wrap">
                        <div>
                            <div className="uk-card uk-card-default uk-card-body uk-card-hover">
                                <p style={{fontSize: '58px', textAlign: 'center'}}><i className="fas fa-user-friends"></i></p>
                                <h3 className="uk-card-title">Meet People</h3>
                            </div>
                        </div>
                        <div onClick={this.addGroupEvent}>
                            <div className="uk-card uk-card-secondary uk-card-body uk-card-hover" style={{backgroundColor: "#1fab89"}}>
                                <p style={{fontSize: '58px', textAlign: 'center'}}><i className="fas fa-comments"></i></p>
                                <h3 className="uk-card-title">Add Group</h3>
                                
                            </div>
                        </div>
                        <div>
                            <div className="uk-card uk-card-secondary uk-card-body uk-card-hover">
                                <p style={{fontSize: '58px', textAlign: 'center'}}><i className="fas fa-search"></i></p>
                                <h3 className="uk-card-title">Search</h3>
                            </div>
                        </div>
                    </div> */}
                </div>
                {
                    this.state.nowShowPopupNum == 1 ?  <></> : 
                    this.state.nowShowPopupNum == 2 ? <AddGroupPopup hidePopup={this.hidePopup}/> :
                    this.state.nowShowPopupNum == 3 ? <AddGroupPopup/> : <></>
                }
            </>
        )
    }
}
