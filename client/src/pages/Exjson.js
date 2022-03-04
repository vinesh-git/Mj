import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import useStyles from "./style";
import pattern from "../images/a7.jpg";
import Plist from "./PageLists/Plist";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand/Brand";
import home from "../images/home-button.png";

const Exjson = ({ currentId, currentP }) => {
  var jf, jsEncode, csvjf;
  try {
    const jsfile = currentP.selectedFile;
    const jsreplace = jsfile.replace("data:application/json;base64,", "");
    jsEncode = JSON.parse(atob(jsreplace));
    // jsEncode = JSON.parse(jsfile);
    jf = JSON.stringify(jsEncode, undefined, 4);
    csvjf = JSON.stringify(currentP.code, undefined, 4);
  } catch (e) {
    console.log(e);
  }
  if (typeof currentP.code === "undefined") {
    currentP.code = "No Code Input Given";
  }
  if (currentP.description === "") {
    currentP.description = "No Description Provided";
  }
  const dataPart = [
    {
      id: 1,
      title: "Data",
      content: currentP.description,
      creator: currentP.creator,
      code: "",
      jff: jf,
      tabelfm: jsEncode,
    },
  ];
  const codePart = [
    {
      id: 1,
      title: "Data",
      content: currentP.description,
      creator: currentP.creator,
      code: "",
      jff: csvjf,
      tabelfm: currentP.code,
    },
  ];

  const [selected, setSelected] = useState("data");
  const [data, setData] = useState([]);

  const classes = useStyles();
  const navigate = useNavigate();

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

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
  const list1 = [
    {
      id: "data",
      titlee: "Data",
    },
    {
      id: "code",
      titlee: "Code",
    },
  ];
  useEffect(() => {
    switch (selected) {
      case "data":
        setData(dataPart);
        break;
      case "code":
        setData(codePart);
        break;
      default:
        setData(dataPart);
        break;
    }
  }, [selected]);

  try {
    return (
      <>
        <div className="main-container">
          <Brand />
          <Card className={classes.card} id="displayCard">
            <CardMedia
              className={classes.media}
              image={pattern}
              title="hello"
            />
            <div className={classes.overlay}>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src={home} alt="" style={{ width: "30px" }} />
              </button>
              <div className="h6fontchanger">
              <Typography variant="h6">{currentP.title}</Typography>
              </div>
              <Typography variant="body2"></Typography>
            </div>
            <div className="navBar">
              <ul>
                {list1.map((item) => (
                  <Plist
                    titlee={item.titlee}
                    active={selected === item.id}
                    id={item.id}
                    setSelected={setSelected}
                  />
                ))}
                <button id="downloadButton" onClick={downloadTxtFile}>
                  <i class="fa fa-download fa-lg"> JSON</i>
                </button>
              </ul>
            </div>
            <div className="tab">
              {data.map((d) => (
                <>
                  <div className="container">
                    <div className="description">Description</div>
                    <div className="DescriptionContainer">{d.content}</div>
                  </div>
                  <div className="container2">
                    <div className="left-container2">
                      <div className={classes.details}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="h1"
                        >
                          <div id="dataexplorer">
                            <h1>Data Explorer:</h1>
                          </div>
                        </Typography>
                      </div>
                      <Typography
                        className={classes.title}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        <div id="creator"> {d.creator} </div>
                      </Typography>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {d.code}
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
                            value={d.jff}
                          ></textarea>
                        </code>
                      </div>
                    </div>
                  </div>
                  <div className="scrolling-wrapper">
                    {<JsonToTable json={d.tabelfm} />}
                  </div>
                </>
              ))}
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
    return <>{console.log(err)}</>;
  }
};

export default Exjson;
