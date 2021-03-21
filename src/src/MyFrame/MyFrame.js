import * as React from 'react';
import "./MyFrame.css";

export default class MyFrame extends React.Component {

    constructor(props) {
        super(props);
    }

    window_close = () => {
        window.main.send("toMain", {value:1234, key:'key', callback :(result)=> console.log('요청 후 결과 값 : ',result)});
    };

  render() {

    return (
      <div className="my-frame">
        <div className="frame-drag-on"></div>
          <div className="frame-icons">
            <i className="fas fa-cog"></i>
            <i className="far fa-window-minimize"></i>
            {/* <i className="fas fa-window-restore"></i> */}
            <i className="fas fa-times" onClick={this.window_close}></i>
          </div>
          
      </div>
    );
  };
};