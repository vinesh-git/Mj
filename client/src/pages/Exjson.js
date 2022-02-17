import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Exjson.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./style";
import pattern from "../images/a7.jpg";
import  Axios  from "axios";
import FileDownload from "js-file-download";

const Exjson = ({ currentId, currentSF }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  var arr = [];

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
<<<<<<< Updated upstream
  var jf;
  const downloadTxtFile = (e) => {
    e.preventDefault()
    const element = document.createElement("a");
    const file = new Blob([jf], {
      type: "JSON/plain"
=======

  var jf;
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([jf], {
      type: "JSON/plain",
>>>>>>> Stashed changes
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.JSON";
    document.body.appendChild(element);
    element.click();
  };

  try {
    const jsfile = currentSF;
    const jsreplace = jsfile.replace("data:application/json;base64,", "");
    var jsEncode = JSON.parse(atob(jsreplace));
    jf = JSON.stringify(jsEncode, undefined, 4);
    arr = Object.entries(post);
<<<<<<< Updated upstream
    

     return (
=======
    console.log(jf);
    return (
>>>>>>> Stashed changes
      <>
      <div>
        <Card className={classes.card} id="displayCard">
          <CardMedia className={classes.media} image={pattern} title="hello" />
          <div className={classes.overlay}>
            <Typography variant="h6">{arr[1][1]}</Typography>
            <Typography variant="body2"></Typography>
          </div>
          <div className="navBar">
            <ul>
              <li>Data</li>
              <li>Code(1)</li>
              <li>Discussion</li>
              <li>Activity</li>
              <li>Metadata</li>

              <button id="downloadButton" onClick={downloadTxtFile}>
                Download
              </button>
            </ul>
          </div>
          <div className="container">
            <div className="Description">Description</div>
            <div className="DescriptionContainer"> iuashdbaksdnk</div>
          </div>
<<<<<<< Updated upstream

          
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >

            {arr[3][1]}
            <button  onClick={downloadTxtFile}>Download</button>

          </Typography>
          <div className="codeDiv">
            <div className="code">
              <code id="output">
                <textarea
                  rows="60"
                  cols="80"
=======
          <div className="container2">
            <div className="left-container2">
              <div className={classes.details}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h3"
>>>>>>> Stashed changes
                >
                  <h1>Data Explorer:</h1>
                </Typography>
              </div>
              <Typography
                className={classes.title}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {arr[3][1]}
              </Typography>
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {arr[2][1]}
              </Typography>
            </CardContent>
            </div>
            <div className="codeDiv">
              <div className="code">
                <code id="output">
                  <textarea
                    rows="60"
                    cols="80"
                    id="textbox"
                    value={jf}
                  ></textarea>
                </code>
              </div>
            </div>
            
          </div>
          <CardActions className={classes.cardActions}>{arr[7][1]}</CardActions>
        </Card>
        <div style={{ height: "20rem" }}></div>
        </div>
      </>
    );
  } catch (err) {
    return <>{console.log(err)}</>;
  }
};

export default Exjson;
