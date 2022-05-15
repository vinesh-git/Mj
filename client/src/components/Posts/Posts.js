import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  AppBar,
  TextField,
  withWidth,
  IconButton,
} from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Brand from "../Brand/Brand";
import Post from "./Post/Post";
import useStyles from "./styles";
import { getPostsBySearch } from "../../actions/posts";
import "bootstrap/dist/css/bootstrap.min.css";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Posts = ({ setCurrentId, setCurrentP }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const query = useQuery();
  //query.get() will read the page url and finds if there is any thing on the page
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch some logic to featch our posts
      //To dispatch something we need to have an action..(Create action to dispatch)
      //We need to convert array to string. Since we cannot pass the arrays through url parameters

      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history("/");
    }
  };
  const handleKeyPress = (e) => {
    //if keycode for enter key is 13
    if (e.KeyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    //loading

    user ? (
      <>
        <div className="row">
          <div className="col-md-4">
            <Brand />
          </div>
          <div className="col-md-5" style={{padding:"0px"}}>
            <div className="row d-flex justify-content-end">
              <div className="col-md-4 d-flex justify-content-end" >
                <TextField
                  name="search"
                  label="Search By Name"
                  onKeyPress={handleKeyPress}
                  defautlValue={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{marginTop:"10px"}}
                />
              </div>
              <div className="col-md-5">
                <ChipInput
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                />
              </div>
              <div className="col-md-3 d-flex justify-content-start">
                <Button
                style={{
                  margin: "15px 0px 0px 0px",  
                  height: "50px",
                  background:"White",
                  border:"2px solid #ff793fce"
                
                }}
                  onClick={searchPost}
                  variant="contained"
                >
                  
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-end">
          <Button style={{marginTop:"20px",backgroundColor:"#ff793fce", height: "50px"}} variant='contained' component={Link} to="/posts/yourWork">{user?.result?.name}</Button>

          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <Button
              style={{
                marginTop: "20px",
                backgroundColor: "#ff793fce",
                height: "50px",
              }}
              variant="contained"
              onClick={logout}
            >
              
              Logout
            </Button>
          </div>
        </div>
        <Header user={user} />
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) =>
            !post ? (
              <CircularProgress />
            ) : (
              <Grid
                key={post._id}
                item
                xs={12}
                sm={6}
                md={3}
                style={{ padding: "50px 0px" }}
              >
                <Post
                  post={post}
                  setCurrentId={setCurrentId}
                  setCurrentP={setCurrentP}
                />
              </Grid>
            )
          )}
        </Grid>
      </>
    ) : (
      <>
        <div className="row">
          <div className="col-md-4">
            <Brand />
          </div>
          <div className="col-md-5" style={{padding:"0px"}}>
            <div className="row d-flex justify-content-end">
              <div className="col-md-4 d-flex justify-content-end" >
                <TextField
                  name="search"
                  label="Search By Name"
                  onKeyPress={handleKeyPress}
                  defautlValue={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{marginTop:"10px"}}
                />
              </div>
              <div className="col-md-5">
                <ChipInput
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                />
              </div>
              <div className="col-md-3 d-flex justify-content-start">
                <Button
                style={{
                  margin: "15px 0px 0px 0px",  
                  height: "50px",
                  background:"White",
                  border:"2px solid #ff793fce"
                
                }}
                  onClick={searchPost}
                  variant="contained"
                >
                  
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-end">
          <Button style={{marginTop:"20px",backgroundColor:"#ff793fce", height: "50px"}} variant='contained' component={Link} to="/yourWork">Your Work</Button>

          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <Button
              style={{
                marginTop: "20px",
                backgroundColor: "#ff793fce",
                height: "50px",
              }}
              variant="contained"
              component={Link} to="/auth"
            >
              SignIn
            </Button>
          </div>
        </div>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
        {posts.map((post) =>
            !post ? (
              <CircularProgress />
            ) : (
              <Grid
                key={post._id}
                item
                xs={12}
                sm={6}
                md={3}
                style={{ padding: "50px 0px" }}
              >
                <Post
                  post={post}
                  setCurrentId={setCurrentId}
                  setCurrentP={setCurrentP}
                />
              </Grid>
            )
          )}
        </Grid>
      </>
    )
  );
};

export default Posts;
