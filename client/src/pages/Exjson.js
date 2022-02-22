import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import "./table.css";

import "./Exjson.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import useStyles from "./style";
import pattern from "../images/a7.jpg";
import ExjsonList from "./ExjsonList";

const Exjson = ({ currentId, currentP }) => {
  const classes = useStyles();
  var arr = [];
  const [selectedT,setSelectedT] = useState("data");
  const list = [
    {
      id: "data",
      title: "Data",
    },
    {
      id: "code",
      title: "Code",
    }
  ];

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  var jf,jsEncode;
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([jf], {
      type: "JSON/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.JSON";
    document.body.appendChild(element);
    element.click();
  };
  try {
    const jsfile = currentP.selectedFile;
    const jsreplace = jsfile.replace("data:application/json;base64,", "");
    jsEncode = JSON.parse(atob(jsreplace));
    
    var oktest = [jsEncode];
    jf = JSON.stringify(jsEncode, undefined, 4);
    // arr = Object.entries(post);
    return (
      <>
        <div className="main-container">
          <Card className={classes.card} id="displayCard">
            <CardMedia
              className={classes.media}
              image={pattern}
              title="hello"
            />
            <div className={classes.overlay}>
              <Typography variant="h6">{currentP.title}</Typography>
              <Typography variant="body2"></Typography>
            </div>
            <div className="navBar">
              <ul>
                {list.map((item)=>(
                  <ExjsonList title={item.title} active={selectedT === item.id} id={item.id} setSelectedT/>
                ))}
                <button id="downloadButton" onClick={downloadTxtFile}>
                  Download
                </button>
              </ul>
            </div>
            <div className="container">
              <div className="Description">Description</div>
              <div className="DescriptionContainer">{currentP.description}</div>
            </div>
            <div className="container2">
              <div className="left-container2">
                <div className={classes.details}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h3"
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
                  {currentP.creator}
                </Typography>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {currentP.code}
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
            <CardActions className={classes.cardActions}>
              {currentP.likeCount}
            </CardActions>
          </Card>
          <div style={{ height: "1rem" }}></div>
        </div>
        <div className="Table">
            <Table data={oktest}/>
        </div>
      </>
    );
  } catch (err) {
    return <>{console.log(err)}</>;
  }
};

export default Exjson;
