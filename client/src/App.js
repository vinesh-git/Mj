import React, { useState, useEffect } from 'react';
import Exjson from './pages/Exjson';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Temp from "./Temp";
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { getPosts } from './actions/posts';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [currentP,setCurrentP] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,currentP, dispatch]);

  return ( 
   <Router>
     <Routes>
       <Route exact path="/"  element={<Temp currentId={currentId} setCurrentId={setCurrentId} currentP={currentP} setCurrentP={setCurrentP}/>} />
       <Route exact path="/user" element={<Exjson currentId={currentId} currentP={currentP} />}/>
     </Routes>
   </Router>
  );
};

export default App;