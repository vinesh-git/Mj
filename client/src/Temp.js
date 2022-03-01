import React, { useState, useEffect } from 'react';
import { Container, AppBar, Grow, Grid, withWidth, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
import Exjson from './pages/Exjson';
import Brand from './components/Brand/Brand';


const Temp = ({currentId,currentP,setCurrentId,setCurrentP}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,currentP, dispatch]);

  return ( 
    <>
    <div>
    <Container maxWidth="lg">
      <Brand/>
      <Header />
      <Grow in>
        <Container style={{ margin:"1rem"}}>
          <div container justify="space-between" alignItems="stretch" spacing={3} >
            <div item xs={5} sm={7}>
              <Posts setCurrentId={setCurrentId} setCurrentP={setCurrentP} />
            </div>
          </div>
        
        </Container>
      </Grow>
    </Container>
    </div>
    </>
    
  );
};

export default Temp;