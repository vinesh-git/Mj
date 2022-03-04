import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { singleFileUpload } from "../../api/index";

import "./css/formmain.css";
import "./css/formutil.css";

const Form = ({ currentId, setCurrentId, setTrigger }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    description: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      code: {},
      tags: "",
      description: "",
      selectedFile: "",
    });
  };

  const [singeFile, setSingleFile] = useState("");

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };
  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singeFile);
    await singleFileUpload(formData);
  };

  const loadFileAsTextCsv = (e) => {
    const filecsvexcel = document.forms["dform"]["csvexcelfile"];
    const validtxtcsv = ["csv", "CSV"];
    const validtxtexcel = ["xlsx", "XLSX", "xls", "XLS"];
    let resultone, resulttwo;
    if (filecsvexcel !== "") {
      const pos_of_dot2 = filecsvexcel.value.lastIndexOf(".") + 1;
      const csvExcel_ext = filecsvexcel.value.substring(pos_of_dot2);

      resultone = validtxtcsv.includes(csvExcel_ext);
      resulttwo = validtxtexcel.includes(csvExcel_ext);

      if (resultone === false && resulttwo === false) {
        alert("Please select the file with extension csv or excel");
        return false;
      }
    }
    if (resultone) {
      var fileToLoad = document.getElementById("helocsv").files[0];
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        setPostData({ ...postData, code: textFromFileLoaded });
      };

      fileReader.readAsText(fileToLoad, "UTF-8");
      // SingleFileChange(e)
      // setPostData({ ...postData, code: "ok" })
    }
    if (resulttwo) {
      SingleFileChange(e);
      setPostData({ ...postData, code: "EMPTY" });
    }
  };

  const loadFileAsText = (e) => {
    var fileToLoad = document.getElementById("helo").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      var bas64 = "data:application/json;base64," + btoa(textFromFileLoaded);
      console.log(bas64);
      setPostData({ ...postData, selectedFile: bas64 });
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filejson = document.forms["dform"]["jsonfile"];
    const validtxt = ["json", "JSON"];

    if (filejson !== "") {
      var pos_of_dot = filejson.value.lastIndexOf(".") + 1;
      var json_ext = filejson.value.substring(pos_of_dot);

      var result = validtxt.includes(json_ext);
      if (result === false) {
        alert("Please select the files with extension json or JSON");
        return false;
      } else {
        if (currentId === 0) {
          dispatch(createPost(postData));
          setTrigger(false);
          clear();
        } else {
          dispatch(updatePost(currentId, postData));
          setTrigger(false);
          clear();
        }
      }
    }
  };
  return (
    <div>
      <body>
        <div className="container-contact100">
          <div className="wrap-contact100">
            <form
              name="dform"
              className="contact100-form validate-form"
              onSubmit={handleSubmit}
            >
              <span className="contact100-form-title">Input Your DataSets</span>

              <div
                className="wrap-input100 validate-input bg1"
                data-validate="Please Type Your Name"
              >
                <span className="label-input100">Creator Name *</span>
                <input
                  className="input100"
                  type="text"
                  name="name"
                  placeholder="Enter Creator Name"
                  value={postData.creator}
                  onChange={(e) =>
                    setPostData({ ...postData, creator: e.target.value })
                  }
                  required
                />
              </div>

              <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                <span className="label-input100">Title of DataSet *</span>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Enter the Title "
                  value={postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="wrap-input100 bg1 rs1-wrap-input100">
                <span className="label-input100">Tag</span>
                <input
                  className="input100"
                  type="text"
                  name="phone"
                  placeholder="Enter the tags(comma Separated)"
                  value={postData.tags}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      tags: e.target.value.split(","),
                    })
                  }
                />
              </div>

              {/* <div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
							<span className="label-input100">Code</span>
							<textarea className="input100" name="message" placeholder="Start typing Code here..." value={postData.code} onChange={(e) => setPostData({ ...postData, code: e.target.value })}></textarea>
						</div> */}

              <input
                type="file"
                id="helocsv"
                name="csvexcelfile"
                align="center"
                onChange={(e) => {
                  loadFileAsTextCsv(e);
                  uploadSingleFile();
                }}
              />

              <div
                className="wrap-input100 validate-input bg0 rs1-alert-validate"
                data-validate="Please Type Your Message"
              >
                <span className="label-input100">Description</span>
                <textarea
                  className="input100"
                  name="message"
                  placeholder="Describe the dataset.."
                  value={postData.description}
                  onChange={(e) =>
                    setPostData({ ...postData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="upload">
                <button type="button" className="btn-warning">
                  <i className="fa fa-upload">Choose the Dataset</i>

                  <input
                    type="file"
                    id="helo"
                    name="jsonfile"
                    align="center"
                    onChange={(e) => {
                      loadFileAsText(e);
                    }}
                    required
                  />
                  <progress
                    id="progressBar"
                    value="0"
                    max="100"
                    style={{ width: "300px" }}
                  ></progress>
                </button>
                <h5 id="fileList"></h5>

                <h3 id="status"></h3>
                <p id="loaded_n_total"></p>
              </div>

              <div className="container-contact100-form-btn">
                <button
                  className="contact100-form-btn"
                  onClick={uploadSingleFile()}
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
};
export default Form;
