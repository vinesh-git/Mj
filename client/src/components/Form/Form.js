import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updatePost } from '../../actions/posts';
import { createPost } from '../../api/index';
import { Paper, Typography } from '@material-ui/core';

import "./css/formmain.css";
import "./css/formutil.css";

const Form = ({ currentId, setCurrentId, setTrigger, user }) => {

	const [postData, setPostData] = useState({title: '', code: '', tags: '', description: '', selectedFile: '', selectedMFile: []});
	const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
	const dispatch = useDispatch();
	

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const clear = () => {
		setCurrentId(0);
		setPostData({title: '', code: '', tags: '', description: '', selectedFile: '', selectedMFile: '' });
	};


	
	const [multipleFiles, setMultipleFiles ] = useState('');

	const MultipleFilesChange = (e) => {
		setMultipleFiles(e.target.files);
		setPostData({...postData, selectedMFile: e.target.files});
	}


	const formData = new FormData();
	const createPosts = async () => {
		formData.append('title', postData.title);
		formData.append('code', postData.code);
		formData.append('tags',postData.tags);
		formData.append('name', user?.result?.name);
		formData.append('description', postData.description);
		formData.append('mode', 'Public');
		

		for(let i=0; i< multipleFiles.length; i++)
		{
			formData.append('files', multipleFiles[i]);
		}
		await createPost(formData);
	}

	function getFileNames() {
		 
		var input = document.forms['dform']['file'];
		var output = document.getElementById('fileListcsv');
		var children = "";
		for (var i = 0; i < input.files.length; i++) {
		  children += '<li>' + 'p'+input.files.item(i).name +'p'+ '</li>';
		}
		output.innerHTML = '<ul>'+children+'</ul>';
	  
	  }

	const fileValidation = () => {
		var selection = document.getElementById('file');
		const validtxt = ['xlsx','xlx','csv','json','txt','docx','png','jpeg','jpg','mp4']
		for (var i=0; i<selection.files.length; i++) {
			var extPos = selection.files[i].name.lastIndexOf('.') + 1;
			var ext = selection.files[i].name.substring(extPos).toLowerCase();
			var result = validtxt.includes(ext);
			if(!result)  {
				alert('not an accepted file extension');
				return false;
			}
		} 
		return true;
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		const validfile = fileValidation();
			
				if(validfile){
				if (currentId === 0) {
					createPosts();
					setTrigger(false);
					clear();
				} else {
					dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
					setTrigger(false);
					clear();
				}
			}
		
	};

	return (
		<div>
			<body>
				<div className="container-contact100">
					<div className="wrap-contact100">
						<form name="dform" className="contact100-form validate-form" onSubmit={handleSubmit}>
							<span className="contact100-form-title">
								Input Your DataSets
							</span>
							<div className="wrap-input100 validate-input bg1 rs1-wrap-input100" >
								<span className="label-input100">Title of DataSet *</span>
								<input className="input100" type="text" name="email" placeholder="Enter the Title " value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required />
							</div>

							<div className="wrap-input100 bg1 rs1-wrap-input100">
								<span className="label-input100">Tag</span>
								<input className="input100" type="text" name="phone" placeholder="Enter the tags(comma Separated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value})} />
							</div>
							<span className="label-input100" style={{color : 'red'}}>* Please use File Formats: Json, Excel, Text, Docx, Image,mp4 * </span>
							<div className="upload">
								
								<button type='button' className='btn-warning'  >
									<i className='fa fa-upload'>Choose Files</i>
									<input type="file" id="file" name="" align="center" accept=".xlsx,.xlx.,.csv,.json,.txt,.docx,.png,.jpeg,.jpg,.mp4" onChange={e=> {MultipleFilesChange(e);getFileNames()}}  multiple/>

									{/* <progress id="progressBarcsv" value="0" max="100" ></progress> */}
								</button>
							</div>
							<ul>
								<li id='fileListcsv'></li> 
							</ul>



							<div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Message">
								<span className="label-input100">Description</span>
								<textarea className="input100" name="message" placeholder="Describe the dataset.." value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} ></textarea>
							</div>
							
							<div className="container-contact100-form-btn">
								<button className="contact100-form-btn" >
									<span>
										Submit
									</span>
								</button >
								
							</div>
						</form>
					</div>
				</div>
			</body>
		</div>
	)
}
export default Form