import React, { useState, useEffect } from 'react';
import Exjson from './pages/Exjson';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Temp from "./Temp";
import { useDispatch } from 'react-redux';
import useStyles from './styles';
<<<<<<< Updated upstream
import Header from "./components/Header/Header";
import Exjson from './pages/Exjson';

=======
import { getPosts } from './actions/posts';
>>>>>>> Stashed changes

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [currentSF,setCurrentSF] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,currentSF, dispatch]);

  return ( 
   <Router>
     <Routes>
       <Route exact path="/"  element={<Temp currentId={currentId} setCurrentId={setCurrentId} currentSF={currentSF} setCurrentSF={setCurrentSF}/>} />
       <Route exact path="/user" element={<Exjson currentId={currentId} currentSF={currentSF} />}/>
     </Routes>
   </Router>
  );
};

export default App;