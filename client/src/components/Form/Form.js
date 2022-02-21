import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId, setTrigger }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', description:'', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', code: '', tags: '', description:'', selectedFile: '' });
  };

  const loadFileAsText = () =>{
    var fileToLoad = document.getElementById("helo").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var bas64 ="data:application/json;base64,"+ btoa(textFromFileLoaded);
        console.log(bas64);
        setPostData({ ...postData, selectedFile: bas64 })
    };
    
    fileReader.readAsText(fileToLoad, "UTF-8");

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var filejson = document.forms['dform']['jsonfile'];
    var validtxt = ["json","JSON"];
    if(filejson === '')
    {
      alert("Please input a json file");
    }
    else if(filejson !== '')
    {
      var pos_of_dot = filejson.value.lastIndexOf('.')+1;
      var json_ext = filejson.value.substring(pos_of_dot);
      
      var result = validtxt.includes(json_ext);
      if(result === false){
        alert('Please select the file with extension json or JSON');
        return false;
      }
      else{
        if (currentId === 0) {
          dispatch(createPost(postData));
          setTrigger(false);
          clear();
        } else {
          dispatch(updatePost(currentId, postData));
          setTrigger(false);
          clear();
        }
      }
    }
  };
  
  return (
    <Paper className={classes.paper}>
      <form name="dform" autoComplete="off"  className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Input the Dataset'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} required/>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required/>
        <TextField name="code" variant="outlined" label="Code" fullWidth multiline rows={4} value={postData.code} onChange={(e) => setPostData({ ...postData, code: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <input type="file"  id ='helo' name="jsonfile" onChange={loadFileAsText} required/> 
        {/* <div className={classes.fileInput}><FileBase type="file" name="jonfile" size={60} multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;