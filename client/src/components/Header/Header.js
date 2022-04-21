import React, { useEffect, useState } from 'react';
import "./header.css";
import {  Button, Grid, Toolbar, Typography } from '@material-ui/core';
import Popup from "../PopUp/Popup";
import img from "../../images/log.png"
import Form from '../Form/Form';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import Brand from '../Brand/Brand';
import { useDispatch } from 'react-redux';


const Header = ({user}) => {

  const [currentId, setCurrentId] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);


  return (
    user ? (<>
      <div className="header">
      <div className="left">
        <div id="h1">Datasets</div>
        <div id="description">
          Explore, analyze, and share quality data.{" "}
          <a href="https://ihub-data.iiit.ac.in/" rel="">
            Learn more
          </a>{" "}
          about inai dataset collections, creations, and collaborations.
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
    {/* <Typography variant='h6'>{user.result.name}</Typography> */}
    {/* <Button variant='contained' onClick={logout}>Logout</Button> */} 
    </>
    ):(<Typography variant='h6'> Please Sign to Proceed </Typography>)
  );
};
export default Header;
