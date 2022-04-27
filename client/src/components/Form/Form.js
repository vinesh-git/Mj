import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { singleFileUpload } from '../../api/index';
import { Paper, Typography } from '@material-ui/core';

import "./css/formmain.css";
import "./css/formutil.css";

const Form = ({ currentId, setCurrentId, setTrigger }) => {

	// const [postData, setPostData] = useState({ creator: '', title: '', code: '', tags: '', description: '', selectedFile: ''});
	const [postData, setPostData] = useState({title: '', code: '', tags: '', description: '', selectedFile: ''});
	const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const clear = () => {
		setCurrentId(0);
		// setPostData({ creator: '', title: '', code: '', tags: '', description: '', selectedFile: '' });
		setPostData({title: '', code: '', tags: '', description: '', selectedFile: '' });
	};


	const [singeFile, setSingleFile] = useState('');

	const SingleFileChange = (e) => {
		setSingleFile(e.target.files[0]);
	}
	const uploadSingleFile = async () => {
		const formData = new FormData();
		formData.append('file', singeFile);
		await singleFileUpload(formData);
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




	function _(el) {
		return document.getElementById(el);
	}

	function uploadFile(e) {
		var file = _("helo").files[0];
		// alert(file.name+" | "+file.size+" | "+file.type);
		var formdata = new FormData();
		formdata.append("jsonfile", file);
		var ajax = new XMLHttpRequest();
		ajax.upload.addEventListener("progress", progressHandler, false);
		ajax.addEventListener("load", completeHandler, false);
		ajax.addEventListener("error", errorHandler, false);
		ajax.addEventListener("abort", abortHandler, false);
		ajax.open("POST", "file_upload_parser.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
		//use file_upload_parser.php from above url
		ajax.send(formdata);
	}

	function progressHandler(event) {
		_("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
		var percent = (event.loaded / event.total) * 100;
		_("progressBar").value = Math.round(percent);
		_("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
	}

	function completeHandler(event) {
		_("status").innerHTML = "File uploaded Succesfully ";

		//wil clear progress bar after successful upload
	}

	function errorHandler(event) {
		_("status").innerHTML = "Upload Failed";
	}

	function abortHandler(event) {
		_("status").innerHTML = "Upload Aborted";
	}
	function uploadFilecsv(e) {
		var file = _("helocsv").files[0];
		// alert(file.name+" | "+file.size+" | "+file.type);
		var formdata = new FormData();
		formdata.append("csvexcelfile", file);
		var ajax = new XMLHttpRequest();
		ajax.upload.addEventListener("progress", progressHandlercsv, false);
		ajax.addEventListener("load", completeHandlercsv, false);
		ajax.addEventListener("error", errorHandlercsv, false);
		ajax.addEventListener("abort", abortHandlercsv, false);
		ajax.open("POST", "file_upload_parser.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
		//use file_upload_parser.php from above url
		ajax.send(formdata);
	}
	var flag = true, flag2 = true;

	function progressHandlercsv(event) {
		_("loaded_n_totalcsv").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
		var percent = (event.loaded / event.total) * 100;
		_("progressBarcsv").value = Math.round(percent);
		_("statuscsv").innerHTML = Math.round(percent) + "% uploaded... please wait";
	}

	function completeHandlercsv(event) {
		_("statuscsv").innerHTML = "File uploaded Succesfully ";

		//wil clear progress bar after successful upload
	}

	function errorHandlercsv(event) {
		_("statuscsv").innerHTML = "Upload Failed";
	}

	function abortHandlercsv(event) {
		_("statuscsv").innerHTML = "Upload Aborted";
	}

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


		if (filejson !== '') {
			var pos_of_dot = filejson.value.lastIndexOf('.') + 1;
			var json_ext = filejson.value.substring(pos_of_dot);

			var result = validtxt.includes(json_ext);
			if (result === false) {
				alert('Please select the files with extension json or JSON');
				return false;
			}
			else if (!flag) {
				alert('Error in Json / Please check file extension');
				return false;
			}
			else if (!flag2) {
				alert('You can only choose excel or json');
				return false;
			}
			else {
				if (currentId === 0) {
					dispatch(createPost({ ...postData, name: user?.result?.name}));
					setTrigger(false);
					clear();
				} else {
					dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
					setTrigger(false);
					clear();
				}
			}
		}
		
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
								<input className="input100" type="text" name="phone" placeholder="Enter the tags(comma Separated)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
							</div>

							{/* <div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your Message">
							<span className="label-input100">Code</span>
							<textarea className="input100" name="message" placeholder="Start typing Code here..." value={postData.code} onChange={(e) => setPostData({ ...postData, code: e.target.value })}></textarea>
						</div> */}
						
							<div className="upload">
								<button type='button' className='btn-warning'  >
									<i className='fa fa-upload'>Choose excel or csv files</i>

									<input type="file" id="helocsv" name="csvexcelfile" align="center" onChange={e => { loadFileAsTextCsv(e); uploadSingleFile(); updateListcsv(); uploadFilecsv(); }} />
									<progress id="progressBarcsv" value="0" max="100" ></progress>
								</button>
							</div>
							<div className="upload">
								<button type='button' className='btn-warning'  >
									<i className='fa fa-upload'>Choose multiple files</i>
									<input type="file" name="file2" id="" required class="form-control"/>
								</button>
							</div>
							<h5 id='fileListcsv'></h5>
							<h3 id="statuscsv"></h3>
							<p id="loaded_n_totalcsv"></p>



							<div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Message">
								<span className="label-input100">Description</span>
								<textarea className="input100" name="message" placeholder="Describe the dataset.." value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} ></textarea>
							</div>
							<div className="upload">
								<button type='button' className='btn-warning'  >
									<i className='fa fa-upload'>Choose the Dataset</i>

									<input type="file" id="helo" name="jsonfile" align="center" onChange={e => { loadFileAsText(e); updateList(); uploadFile() }} required />
									<progress id="progressBar" value="0" max="100" ></progress>
								</button>
							</div>
							<h5 id='fileList'></h5>
							<h3 id="status"></h3>
							<p id="loaded_n_total"></p>


							<div className="container-contact100-form-btn">
								<button className="contact100-form-btn" onClick={uploadSingleFile()}>
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