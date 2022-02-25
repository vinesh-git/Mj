import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import "./css/formmain.css";
import "./css/formutil.css";

const Form = ({ currentId, setCurrentId, setTrigger }) => {
	const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', description:'', selectedFile: '' });
	const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
	const dispatch = useDispatch();
  
	useEffect(() => {
	  if (post) setPostData(post);
	}, [post]);
  
	const clear = () => {
	  setCurrentId(0);
	  setPostData({ creator: '', title: '', code: '', tags: '', description:'', selectedFile: '' });
	};
  
	const loadFileAsText = () =>{
	  var fileToLoad = document.getElementById("helo").files[0];
	  var fileReader = new FileReader();
	  fileReader.onload = function(fileLoadedEvent){
		  var textFromFileLoaded = fileLoadedEvent.target.result;
		  var bas64 ="data:application/json;base64,"+ btoa(textFromFileLoaded);
		  console.log(bas64);
		  setPostData({ ...postData, selectedFile: bas64 })
	  };
	  
	  fileReader.readAsText(fileToLoad, "UTF-8");
  
	};
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  var filejson = document.forms['dform']['jsonfile'];
	  var validtxt = ["json","JSON"];
	  if(filejson === '')
	  {
		alert("Please input a json file");
	  }
	  else if(filejson !== '')
	  {
		var pos_of_dot = filejson.value.lastIndexOf('.')+1;
		var json_ext = filejson.value.substring(pos_of_dot);
		
		var result = validtxt.includes(json_ext);
		if(result === false){
		  alert('Please select the file with extension json or JSON');
		  return false;
		}
		else{
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
			<div class="container-contact100">
				<div class="wrap-contact100">
					<form name="dform" class="contact100-form validate-form"  onSubmit={handleSubmit}>
						<span class="contact100-form-title">
							Input Your DataSets
						</span>

						<div class="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
							<span class="label-input100">Creator Name *</span>
							<input class="input100" type="text" name="name" placeholder="Enter Creator Name" value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} required/>
						</div>

						<div class="wrap-input100 validate-input bg1 rs1-wrap-input100" >
							<span class="label-input100">Title of DataSet *</span>
							<input class="input100" type="text" name="email" placeholder="Enter the Title "  value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required/>
						</div>

						<div class="wrap-input100 bg1 rs1-wrap-input100">
							<span class="label-input100">Tag</span>
							<input class="input100" type="text" name="phone" placeholder="Enter the tags(comma Separated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
						</div>
						
						<div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
							<span class="label-input100">Code</span>
							<textarea class="input100" name="message" placeholder="Start typing Code here..." value={postData.code} onChange={(e) => setPostData({ ...postData, code: e.target.value })}></textarea>
						</div>

						<div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
							<span class="label-input100">Description</span>
							<textarea class="input100" name="message" placeholder="Describe the dataset.." value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} ></textarea>
						</div>
						<input type="file" id="helo" name="jsonfile" align="center" onChange={loadFileAsText} required/>
						
						<div class="container-contact100-form-btn">
							<button class="contact100-form-btn">
								<span>
									Submit
								</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</body>
	</div>
  )
}
export default Form