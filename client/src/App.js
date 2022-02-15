import React, { useState, useEffect } from 'react';
import { Container, AppBar, Grow, Grid, withWidth, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import Header from "./components/Header/Header";


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return ( 
    
    <Container maxWidth="lg">
      <Header />
      <Grow in>
        <Container style={{ margin:"1rem"}}>
        
          <div container justify="space-between" alignItems="stretch" spacing={3} >
            <div item xs={5} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </div>
          </div>
        
        </Container>
      </Grow>
      
    </Container>
  );
};

export default App;