import React, { useState, useEffect } from 'react';
import Exjson from './pages/Exjson';
import YourWork from './pages/YourWork';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Temp from "./Temp";
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Auth from './components/Auth/Auth';




const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [currentP,setCurrentP] = useState(0);
  

  return ( 
    <Router>
     <Routes>
       <Route exact path="*" element={<Navigate to="/" replace />}/>
       <Route exact path="/"  element={<Temp currentId={currentId} setCurrentId={setCurrentId} currentP={currentP} setCurrentP={setCurrentP}/>} />
       <Route exact path="/posts/:id" element={<Temp currentId={currentId} setCurrentId={setCurrentId} currentP={currentP} setCurrentP={setCurrentP}></Temp>}/>
       <Route exact path="/posts/YourWork/:id" element={<YourWork currentId={currentId} setCurrentId={setCurrentId}  setCurrentP={setCurrentP}/>}/>
       <Route exact path="/posts/search" element={<Temp  setCurrentId={setCurrentId} setCurrentP={setCurrentP}/>} />
       <Route exact path="/posts/yourWork" element={<YourWork currentId={currentId} setCurrentId={setCurrentId}  setCurrentP={setCurrentP}/>} />
       <Route exact path='/auth' element={<Auth />}/>
       <Route exact path="/user" element={<Exjson currentId={currentId} currentP={currentP} />}/>
     </Routes>
   </Router>
  );
};

export default App;