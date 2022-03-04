import React from 'react';
import { Grid, CircularProgress, withWidth } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId,setCurrentP }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    //loading
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container  alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          !post ? <CircularProgress/> : (
          <Grid key={post._id} item xs={12} sm={6} md={3}>
            <Post post={post} setCurrentId={setCurrentId} setCurrentP={setCurrentP}/>
          </Grid>
          )
        ))}
      </Grid>
    )
  );
};

export default Posts;