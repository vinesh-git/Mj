import React, { useState } from 'react';
import "./header.css";
import {  Grid } from '@material-ui/core';
import Popup from "../PopUp/Popup";
import img from "../../images/log.png"
import Form from '../Form/Form';


const Header = () => {
  const [currentId, setCurrentId] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <div className="header">
        <div className="left">
          <div id="h1">Datasets</div>
          <div id="description">
            Explore, analyze, and share quality data.{" "}
            <a href="https://www.kaggle.com/datasets" rel="">
              Learn more
            </a>{" "}
            about data types, creating, and collaborating.
          </div>
          <div className="button-container">
            <button className="button primary" onClick={() => setButtonPopup(true)}>
            + New Dataset
            </button>
            {/* <button className="button secondary">
            Your Work
            </button> */}
          </div>
        </div>
        <div className="right">
            <img src={img} alt=''/>
        </div>
      </div>
      <Popup trigger={buttonPopup} setTrigger = {setButtonPopup}>
        <Form currentId={currentId} setCurrentId={setCurrentId} setTrigger={setButtonPopup}/>
          {/* <Form currentId={currentId} setCurrentId={setCurrentId} setTrigger={setButtonPopup}></Form> */}
      </Popup>
    </>
  );
};
export default Header;
