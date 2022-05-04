import React, { useState, useEffect } from "react";
import {Container,Grow, AppBar, TextField, Button, Paper} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import { getPosts, getPostsBySearch } from "./actions/posts";
import useStyles from "./styles";
import Brand from "./components/Brand/Brand";
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}



const Temp = ({ currentId, currentP, setCurrentId, setCurrentP }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  //We get Page info from query
  const query = useQuery();
  const history = useNavigate();
  //query.get() will read the page url and finds if there is any thing on the page
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, currentP, dispatch]);
  
  const searchPost = () => {
    if(search.trim() || tags) {
      //dispatch some logic to featch our posts
      //To dispatch something we need to have an action..(Create action to dispatch)
      //We need to convert array to string. Since we cannot pass the arrays through url parameters
      
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }else{
      history('/');
    }
  };
  const handleKeyPress = (e) => {
    //if keycode for enter key is 13
    if(e.KeyCode === 13){
      searchPost();
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


  return (
    <>
      <div className="maincontainer" style={{ padding:'0rem 3rem'}}>
      <AppBar position="static" color="green">
          <TextField 
          name="search" 
          variant="outlined" 
          label="search Datasets" 
          onKeyPress={handleKeyPress} 
          fullWidth 
          defautlValue={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        <ChipInput 
          value={tags}
          onAdd={handleAdd}
          onDelete={handleDelete} 
          label= "Search Tags"
          variant="outlined"
        />
        <Button onClick={searchPost} color="inherit" variant="contained">Search</Button>
        </AppBar>
          <Grow in>
              <div container justify="space-between" alignItems="stretch" >
                <div item xs={5} sm={7}>
                  <Posts setCurrentId={setCurrentId} setCurrentP={setCurrentP} />
                </div>
              </div>
          </Grow>
      </div>
    </>
  );
};

export default Temp;
