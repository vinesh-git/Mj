import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography, Button, withWidth } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';

import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Brand from '../components/Brand/Brand';
import Post from '../components/Posts/Post/Post';
import useStyles from '../components/Posts/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = ({ setCurrentId,setCurrentP }) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  


  useEffect (() => {
    const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile'))); 
    },[location]);
    console.log(user)

  return (
    //loading
    <>
      <div className='row'>
        <div className='col-md-9'>
         <Brand/>
        </div>
        <div className='col-md-2'>
         
        </div>
        <div className='col-md-1'>

        <Button style={{marginTop:"20px",backgroundColor:"#ff793fce"}} variant='contained' component={Link} to="/">Home</Button>
        </div>
      </div>
      <Header user={user}/>
      <Grid className={classes.container} container  alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          !post ? <CircularProgress/> : ( 
          <Grid key={post._id} item xs={12} sm={6} md={3} style={{ padding:"50px 0px"}}>
              {(user?.result?.googleId === post?.creator || user?.result?._id == post?.creator) && (
            <Post post={post} setCurrentId={setCurrentId} setCurrentP={setCurrentP} />
              )}
          </Grid>
          )
        ))}
      </Grid>
        </>
  );
};

export default Posts;