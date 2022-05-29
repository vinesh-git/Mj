import React, { useEffect, useState } from 'react';
import "./header.css";
import {  Button, Grid, Toolbar, Typography } from '@material-ui/core';
import Popup from "../PopUp/Popup";
import img from "../../images/log.png"
import Form from '../Form/Form';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import Brand from '../Brand/Brand';
import { useDispatch } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({user}) => {

  const [currentId, setCurrentId] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);


  return (
    user ? (<>
      <div className="header">
        <div className='row'>
        <div className="col-9">
          <div id="description">
            <div id="h1">Datasets</div>
            Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.INAI is an initiative to apply AI to population scale problems in the Indian context, combining research and translation. This collaborative effort, championed by Intel and catalyzed by the Government of Telangana           <br></br> <button className=" primary row" style={{margin:"30px 1px"}} onClick={() => setButtonPopup(true)}>
              + New Dataset
            </button> 
            <p style={{color : 'red'}}>* Please reload the page if the uploaded document is not visible *</p>
          </div>
        </div>
        <div className="col-3 right" id='image'>
            <img src={img} alt=''/>
        </div>
        </div>
        
    </div>
    <Popup trigger={buttonPopup} setTrigger = {setButtonPopup}>
      <Form currentId={currentId} setCurrentId={setCurrentId} setTrigger={setButtonPopup} user={user}/>
        {/* <Form currentId={currentId} setCurrentId={setCurrentId} setTrigger={setButtonPopup}></Form> */}
    </Popup>
    {/* <Typography variant='h6'>{user.result.name}</Typography> */}
    {/* <Button variant='contained' onClick={logout}>Logout</Button> */} 
    </>
    ):(<Typography variant='h6'> Please Sign to Proceed </Typography>)
  );
};
export default Header;
