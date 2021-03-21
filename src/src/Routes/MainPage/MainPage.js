import * as React from 'react';
import alertDialog from '../../services/AlertDialog/AlertDialog';
import "./MainPage.css";
import FontAwesome from 'react-fontawesome';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
  }

  

  render() {

    return (
      <div className="main-page page">
        <div className="logo"></div>
      </div>
    );
  };
};