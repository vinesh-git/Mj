import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Button, withWidth } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';

import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Brand from '../Brand/Brand';
import Post from './Post/Post';
import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className='row'>
        <div className='col-md-9'>
         <Brand/>
        </div>
        <div className='col-md-2'>
         
        </div>
        <div className='col-md-1'>
          <Button style={{marginTop:"20px",backgroundColor:"#ff793fce"}} variant='contained' onClick={logout}>Logout</Button>
        </div>
      </div>
      <Header user={user}/>
      <Grid className={classes.container} container  alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          !post ? <CircularProgress/> : (
          <Grid key={post._id} item xs={12} sm={6} md={3} style={{ padding:"50px 0px"}}>
            <Post post={post} setCurrentId={setCurrentId} setCurrentP={setCurrentP} />
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