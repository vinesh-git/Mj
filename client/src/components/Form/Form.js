import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updatePost } from '../../actions/posts';
import { singleFileUpload, createPost } from '../../api/index';
import { Paper, Typography } from '@material-ui/core';

import "./css/formmain.css";
import "./css/formutil.css";

const Form = ({ currentId, setCurrentId, setTrigger }) => {

	// const [postData, setPostData] = useState({ creator: '', title: '', code: '', tags: '', description: '', selectedFile: ''});
	const [postData, setPostData] = useState({title: '', code: '', tags: '', description: '', selectedFile: '', selectedMFile: []});
	const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const clear = () => {
		setCurrentId(0);
		// setPostData({ creator: '', title: '', code: '', tags: '', description: '', selectedFile: '' });
		setPostData({title: '', code: '', tags: '', description: '', selectedFile: '', selectedMFile: '' });
	};


	const [singleFile, setSingleFile] = useState('');
	const [multipleFiles, setMultipleFiles ] = useState('');

	const SingleFileChange = (e) => {
		setSingleFile(e.target.files[0]);
	}

	const MultipleFilesChange = (e) => {
		setMultipleFiles(e.target.files);
		setPostData({...postData, selectedMFile: e.target.files});
		// uploadMultipleFiles(e);
	}

	const uploadSingleFile = async () => {
		const formData = new FormData();
		formData.append('file', singleFile);
		await singleFileUpload(formData);
	}
	const formData = new FormData();
	const createPosts = async () => {
		// formData.append('title',postData.title);
		formData.append('title', postData.title);
		formData.append('code', postData.code);
		formData.append('tags',postData.tags);
		formData.append('name', user?.result?.name);
		formData.append('description', postData.description);
		

		for(let i=0; i< multipleFiles.length; i++)
		{
			formData.append('files', multipleFiles[i]);
		}
		// setPostData({...postData, selectedMFile:formData})
		await createPost(formData);
	}


	function updateList() {
		var input = document.forms['dform']['jsonfile'];

		var output = document.getElementById('fileList');
		for (var i = 0; i < input.files.length; ++i) {
			output.innerHTML = input.files.item(i).name;
		}

	}
	function updateListcsv() {
		var input = document.forms['dform']['csvexcelfile'];

		var output = document.getElementById('fileListcsv');
		for (var i = 0; i < input.files.length; ++i) {
			output.innerHTML = input.files.item(i).name;
		}

	}



	var flag = true, flag2 = true;


	const loadFileAsTextCsv = (e) => {

		const filecsvexcel = document.forms['dform']['csvexcelfile'];
		const validtxtcsv = ["csv", "CSV"];
		const validtxtexcel = ["xlsx", "XLSX", "xls", "XLS"];
		let resultone, resulttwo;
		if (filecsvexcel !== '') {
			const pos_of_dot2 = filecsvexcel.value.lastIndexOf('.') + 1;
			const csvExcel_ext = filecsvexcel.value.substring(pos_of_dot2);

			resultone = validtxtcsv.includes(csvExcel_ext);
			resulttwo = validtxtexcel.includes(csvExcel_ext);


			if (resultone === false && resulttwo === false) {
				alert('Please select the file with extension csv or excel');
				flag2 = false;
				return false;
			}
		}
		if (resultone) {
			var fileToLoad = document.getElementById("helocsv").files[0];
			var fileReader = new FileReader();
			fileReader.onload = function (fileLoadedEvent) {
				var textFromFileLoaded = fileLoadedEvent.target.result;
				setPostData({ ...postData, code: textFromFileLoaded })
			};

			fileReader.readAsText(fileToLoad, "UTF-8");
			// SingleFileChange(e)
			// setPostData({ ...postData, code: "ok" })
		}
		if (resulttwo) {
			SingleFileChange(e)
			setPostData({ ...postData, code: "EMPTY" })
		}

	};

	const loadFileAsText = (e) => {
		var fileToLoad = document.getElementById("helo").files[0];
		var fileReader = new FileReader();
		fileReader.onload = function (fileLoadedEvent) {
			var textFromFileLoaded = fileLoadedEvent.target.result;
			try {
				var bas64 = "data:application/json;base64," + btoa(textFromFileLoaded);
				setPostData({ ...postData, selectedFile: bas64 })
			} catch {
				alert("Error in JSON / Please check file extension");
				flag = false;
			}
		};

		fileReader.readAsText(fileToLoad, "UTF-8");

	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const filejson = document.forms['dform']['jsonfile'];
		const validtxt = ["json", "JSON"];


		// if (filejson !== '') {
		// 	var pos_of_dot = filejson.value.lastIndexOf('.') + 1;
		// 	var json_ext = filejson.value.substring(pos_of_dot);

		// 	var result = validtxt.includes(json_ext);
		// 	if (result === false) {
		// 		alert('Please select the files with extension json or JSON');
		// 		return false;
		// 	}
		// 	else if (!flag) {
		// 		alert('Error in Json / Please check file extension');
		// 		return false;
		// 	}
			// else if (!flag2) {
			// 	alert('You can only choose excel or json');
			// 	return false;
			// }
			// else {
				if (currentId === 0) {
					createPosts();
					// dispatch(createPost(formData));
					// dispatch(createPost({ ...postData, name: user?.result?.name}));
					setTrigger(false);
					clear();
				} else {
					dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
					setTrigger(false);
					clear();
				}
			// }
		// }
		
	};

	if(!user?.result?.name)
	{
		return(
			<Paper>
				<Typography variant="h6" align="center">
					Please Sign In !!!
				</Typography>
			</Paper>
		)
	}

	return (
		<div>
			<body>
				<div className="container-contact100">
					<div className="wrap-contact100">
						<form name="dform" className="contact100-form validate-form" onSubmit={handleSubmit}>
							<span className="contact100-form-title">
								Input Your DataSets
							</span>

							{/* <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
								<span className="label-input100">Creator Name *</span>
								<input className="input100" type="text" name="name" placeholder="Enter Creator Name" value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} required />
							</div> */}

							<div className="wrap-input100 validate-input bg1 rs1-wrap-input100" >
								<span className="label-input100">Title of DataSet *</span>
								<input className="input100" type="text" name="email" placeholder="Enter the Title " value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required />
							</div>

							<div className="wrap-input100 bg1 rs1-wrap-input100">
								<span className="label-input100">Tag</span>
								<input className="input100" type="text" name="phone" placeholder="Enter the tags(comma Separated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value})} />
							</div>

							{/* <div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
							<span className="label-input100">Code</span>
							<textarea className="input100" name="message" placeholder="Start typing Code here..." value={postData.code} onChange={(e) => setPostData({ ...postData, code: e.target.value })}></textarea>
						</div> */}
						
							<div className="upload">
								<button type='button' className='btn-warning'  >
									<i className='fa fa-upload'>Choose excel or csv files</i>

									{/* <input type="file" id="helocsv" name="csvexcelfile" align="center" onChange={e => { loadFileAsTextCsv(e); uploadSingleFile(); updateListcsv(); }} /> */}
									<input type="file" id="helocsv" name="csvexcelfile" align="center" onChange={e=> {MultipleFilesChange(e)}}  multiple/>

									<progress id="progressBarcsv" value="0" max="100" ></progress>
								</button>
							</div>
							<h5 id='fileListcsv'></h5>
							<h3 id="statuscsv"></h3>
							<p id="loaded_n_totalcsv"></p>



							<div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Message">
								<span className="label-input100">Description</span>
								<textarea className="input100" name="message" placeholder="Describe the dataset.." value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} ></textarea>
							</div>
							{/* <div className="upload">
								<button type='button' className='btn-warning'  >
									<i className='fa fa-upload'>Choose the Dataset</i>

									<input type="file" id="helo" name="jsonfile" align="center" onChange={e => { loadFileAsText(e); updateList(); }} required />
									<progress id="progressBar" value="0" max="100" ></progress>
								</button>
							</div> */}
							{/* <h5 id='fileList'></h5>
							<h3 id="status"></h3>
							<p id="loaded_n_total"></p> */}


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