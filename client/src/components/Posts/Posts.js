import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Button, withWidth } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';

import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId,setCurrentP }) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  
  const logout = () => {
    dispatch( { type: 'LOGOUT'});

    history('/');

    setUser(null);

  };

  useEffect (() => {
    const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile'))); 
    },[location]);

  return (
    //loading
     user ? (
      <>
      <Header user={user}/>
      {/* <Typography variant='h6'>{user.result.name}</Typography> */}
      <Button variant='contained' onClick={logout}>Logout</Button>
      <Grid className={classes.container} container  alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          !post ? <CircularProgress/> : (
          <Grid key={post._id} item xs={12} sm={6} md={3}>
            <Post post={post} setCurrentId={setCurrentId} setCurrentP={setCurrentP}/>
          </Grid>
          )
        ))}
      </Grid>
      </>
    ):(

      <>
      <Button  component={Link} to="/auth" variant='contained' fullWidth > Sign In</Button>
      </>
    )
  );
};

export default Posts;