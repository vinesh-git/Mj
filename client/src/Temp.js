import React, { useState, useEffect } from "react";
import {Container,Grow, AppBar, TextField, Button, Paper} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import { getPosts, getPostsBySearch } from "./actions/posts";
import useStyles from "./styles";
import Pagination from "../src/components/Pagination/Pagination"
import Brand from "./components/Brand/Brand";
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}



const Temp = ({ currentId, currentP, setCurrentId, setCurrentP}) => {
  //page
  const dispatch = useDispatch();
  const classes = useStyles();
  //We get Page info from query
  const query = useQuery();
  const history = useNavigate();
  //query.get() will read the page url and finds if there is any thing on the page
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, currentP, dispatch]);
  


  return (
    <>
      <div className="maincontainer" style={{ padding:'0rem 3rem'}}>
          <Grow in>
              <div container justify="space-between" alignItems="stretch" >
                <div item xs={5} sm={7}>
                  <Posts setCurrentId={setCurrentId} setCurrentP={setCurrentP} />
                  <Paper elevation={6}>
                    <Pagination page={page} pageFrom={'Home'}/>
                  </Paper>
                </div>
                
              </div>
          </Grow>
      </div>
    </>
  );
};

export default Temp;
