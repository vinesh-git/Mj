import React from "react";
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost, selectPost } from "../../../actions/posts";
import useStyles from "./styles";
import i0 from "../../../images/a0.jpg";
import i1 from "../../../images/a1.jpg";
import i2 from "../../../images/a2.jpg";
import i3 from "../../../images/a3.jpg";
import i4 from "../../../images/a4.jpg";
import i5 from "../../../images/a5.jpg";
import i6 from "../../../images/a6.jpg";
import i7 from "../../../images/a7.jpg";
import i8 from "../../../images/a8.jpg";
import i9 from "../../../images/a9.jpg";
import i10 from "../../../images/a10.jpg";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId, setCurrentP }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
    return post.likes.find( (like) => like === (user?.result?.googleId || user?.result?._id)) 
    ? (
      <>< ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1}  others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
    ) : (
      <><ThumbUpAltOutlined fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : "Likes"}</>
    );
    }
    return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>;
  };

  var arr = new Array();
  arr[0] = new Image();
  arr[1] = new Image();
  arr[2] = new Image();
  arr[3] = new Image();
  arr[4] = new Image();
  arr[5] = new Image();
  arr[6] = new Image();
  arr[7] = new Image();
  arr[8] = new Image();
  arr[9] = new Image();
  arr[10] = new Image();

  arr[0].src = i0;
  arr[1].src = i1;
  arr[2].src = i2;
  arr[3].src = i3;
  arr[4].src = i4;
  arr[5].src = i5;
  arr[6].src = i6;
  arr[7].src = i7;
  arr[8].src = i8;
  arr[9].src = i9;
  arr[10].src = i10;
  var num = Math.floor(Math.random() * 11);
  const ImagePost = arr[num].src;

  return (
    <div>
      <Card className={classes.card} style={{backgroundColor:"#F5F5F5"}}>
        <div onClick={() => {
            setCurrentId(post._id); 
            setCurrentP(post);
            navigate("/user");
            
          }} style={{padding:"0px",margin:"0px", borderRadius:"15px 15px 0px 0px"}}
        >
          <CardMedia className={classes.media} image={i4} style={{margin:'0px'}} title={post.title} />
          <div className={classes.overlay}>
            <div style={{ fontSize: "3vh" }}>{post.title}</div>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>

          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h6" component="h2" >
            {post.name}
          </Typography>
        </div>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))} >
            <Likes/>
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id == post?.creator) && (
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
          )}
          
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
