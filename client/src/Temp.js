import React from "react";
import {Grow, Paper} from "@material-ui/core";

import { useLocation } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import Pagination from "../src/components/Pagination/Pagination"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}



const Temp = ({setCurrentId, setCurrentP}) => {
  //We get Page info from query
  const query = useQuery();
  //query.get() will read the page url and finds if there is any thing on the page
  const page = query.get('page') || 1;


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
