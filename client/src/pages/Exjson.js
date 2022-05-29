import React, { useEffect, useState } from "react";
import "./Exjson.css";

import "./table.css";
import { JsonToTable } from "react-json-to-table";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import { useDispatch } from 'react-redux';
import useStyles from "./style";
import pattern from "../images/a7.jpg";
import Plist from "./PageLists/Plist";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand/Brand";
import home from "../images/home-button.png";
import { updatePost } from "../actions/posts";

import 'bootstrap/dist/css/bootstrap.min.css';


const Exjson = ({ currentId, currentP }) => {
 
  const post = currentP;
  console.log(post)
  // const post = useSelector((state) =>
  //   currentId ? state.posts.find((message) => message._id === currentId) : null
  // );

  const [selected, setSelected] = useState("data");
  console.log(selected)
  const [data, setData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();






let fileDisplay;
let isTable;
if(selected.fileType==='text/plain')
{
  fileDisplay = <textarea rows="60" cols="80" id="textbox" value={JSON.stringify(selected.fileData)}></textarea>
}
else if(selected.fileType==='image/jpeg' || selected.fileType==='image/png')
{
  fileDisplay = <img src={`http://localhost:5000/${selected.filePath}`}  style={{maxWidth :'100%', maxHeight : '100%'}} className="card-img-top img-responsive" alt="img"/>
}
else if(selected.fileType==='application/json' || selected.fileType==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
{
  // fileDisplay = <textarea rows="60" cols="80" id="textbox" value={JSON.stringify(selected.fileData)}></textarea>
  isTable=true;
}
else if(selected.fileType==='video/mp4'){
    fileDisplay=<video style={{maxWidth :'100%', maxHeight : '100%'}} controls><source src={`http://localhost:5000/${selected.filePath}`}  type="video/mp4"></source>
    Your browser does not support the video tag.</video>
  
}
else
{
  fileDisplay = <textarea rows="60" cols="80" id="textbox" value={`Unfortunately, we can't show a preview for this file.\nPlease downlaod the file to View`}></textarea>
}

const downloadTxtFile = () => {
  const element = document.createElement("a");
  element.href = `http://localhost:5000/${selected.filePath}`
  element.download = "myFile.JSON";
  document.body.appendChild(element);
  element.click();
};
const [isPublic, setIsPublic] = useState(currentP.mode)
const changeMode = () => {
  if(isPublic === 'Public')
  {
    dispatch(updatePost(currentId, {mode:'Private'}));
    setIsPublic('Private');
  }
  else
  {
    dispatch(updatePost(currentId, {mode:'Public'}));
    setIsPublic('Public');
  }
  
}

  try {
    return (
      <>
        <div className="main-container">
          <Brand />
          <Card className={classes.card} id="displayCard" style={{ padding:'0px'}}>
            <CardMedia className={classes.media} image={pattern} title="hello" />
            <div className={classes.overlay}>
              <div className="h6fontchanger">
              <Typography variant="h6">{currentP.title}</Typography>
              </div>
              <Typography variant="body2"></Typography>
            </div>
            <div className="row">
                
              <div className="col">
              <Button style={{backgroundColor:"white",margin:"10px",width:"auto",border:"2px solid #ff793fce"}} variant='contained' onClick={downloadTxtFile}>DOWNLOAD</Button>
              {(  user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button style={{backgroundColor:"white",margin:"10px",width:"auto",border:"2px solid #ff793fce"}} variant='contained' onClick={changeMode}>{isPublic}</Button>

              )}

               {/* <Button style={{backgroundColor:"white",margin:"10px",width:"auto",border:"2px solid #ff793fce"}} variant='contained' onClick={selected==='data'?downloadTxtFile:downloadTxtFilecsv} >DOWNLOAD</Button> */}
              </div>
              <div className="col d-flex justify-content-end">
                <Button style={{backgroundColor:"#ff793fce",margin:"10px",width:"auto"}} variant='contained' onClick={() => { navigate("/");}} >HOME</Button>
              </div>
            </div>
            <div className="tab">
              
                <>
                  <div className="container1">
                    <div className="description row" >Description</div>
                    <div className="DescriptionContainer row">{post.description}</div>
                  </div>
                  <div className="container2 row" style={{margin:"0rem 2rem"}}>
                    <div className="left-container2 col">
                      <div className={classes.details}>
                          <div id="dataexplorer">
                            Data Explorer:
                          </div>
                      </div>
                      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                        <div id="creator"> {selected.fileName} </div>
                      </Typography>
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {/* d.code */}
                        </Typography>
                        <Typography className={classes.title}  variant="h5" component="h2">
                        <ul  style={{width:"100%",height:"200px",padding:"10px",overflow:"auto"}}>
                          {
                            post.files.map((file) => (
                              <div className="plist" style={{height:"50px",color:"#ff793fce"}}>
                              <Plist title={file.fileName} active={selected.filePath === file.filePath} filee={file} setSelected={setSelected}/>
                              </div>
                            ))  
                          }
                        </ul>
                        <div id="creator">creator : {post.name} </div>
                      </Typography>
                      </CardContent>
                    </div>
                    <div className="codeDiv col">
                      <div className="code">
                        <code id="output">
                            {fileDisplay}
                        </code>
                      </div>
                    </div>
                  </div>
                  
                  
                    {isTable && (
                    <div>
                    <div className="container1" style={{marginTop:"5rem"}}>
                    <div className="description row" >DETAILS</div>
                    </div>
                    <div className="scrolling-wrapper">
                    <JsonToTable json={selected.fileData}/>
                    </div>
                    </div>
                    )}
                  
                </>
            </div>
            <CardActions className={classes.cardActions}>
              {currentP.likeCount}
            </CardActions>
          </Card>

          <div style={{ height: "1rem" }}></div>
        </div>
      </>
    );
  } catch (err) {
    console.log(typeof post)
  }
};

export default Exjson;
