import express, { json } from 'express';
import mongoose from 'mongoose';
import csvToJson from 'convert-csv-to-json';
import csv from 'csvtojson';
import fs from 'fs';

import excelToJson from 'convert-excel-to-json';
import { readFileSync,unlinkSync } from 'fs';

import PostMessage from '../models/postMessage.js';


const router = express.Router();

export const getPosts = async (req, res) => { 

    const {page} = req.query;
    

    try {
        const LIMIT = 8;
        //get the starting index of every page
        const startIndex = (Number(page)-1) * LIMIT;
        const PublicPosts = await PostMessage.find({mode:'Public'});
        const total = PublicPosts.length;
        
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/ LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const  getPostsBySearch = async (req, res) => {

    //Here we using Query(working explained) /posts?page=1 --> page is now 1 --> posts/1 (used for searching/quering)
    //But for params /posts/:id --> we can change id by what ever we send like if id is 123 --> /posts/123 (used for geting some resources)

    const {searchQuery, tags} = req.query
    try{
            const title = new RegExp(searchQuery, 'i'); //i is the ignore case in back end
            
            const posts = await PostMessage.find({ $or:[{title}, {tags: {$in: tags.split(',')} }] });

            res.json({data:posts});
    }catch(error){
        res.status(404).json({message: error.message});
    }
}



// export const createPost = async (req, res) => {

//     console.log(req.body.selectedMFile);
//     const post = req.body;
//     let code;
//     var flag = false;
//     if(req.body.code == "")
//     {
//         flag = true;
//         code = "No Input provided";
//     }
//     else if(req.body.code == "EMPTY" ){
//         flag = true;
//         code =  excelToJson({
//             source: readFileSync('../server/uploads/sample.xls') // fs.readFileSync return a Buffer
//         });
//         try{
//             unlinkSync('../server/uploads/sample.xls');
//            }catch(err){
//             console.log(err);
//            }
//     }
    
//     const newPostMessage = new PostMessage({...post, code:code, creator: req.userId, createdAt: new Date().toISOString()})
//     // const newPostMessage = new PostMessage({ title, code, selectedFile, creator, tags,description })
    
//     try {
//         if(!flag){
//             newPostMessage.code = await csv().fromString(req.body.code);
//         }
//         await newPostMessage.save();
        // res.status(201).json(newPostMessage );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// export const createPost = async (req, res) => {
//     // const { title, code, selectedFile, creator, tags,description } = req.body;
//     const title = req.body.title;
//     const selectedFile = req.body.selectedFile;
//     const creator = req.userId;
//     const tags = req.body.tags;
//     const description = req.body.description;
//     let code;
//     var flag = false;
//     if(req.body.code == "")
//     {
//         flag = true;
//         code = "No Input provided";
//     }
//     else if(req.body.code == "EMPTY" ){
//         flag = true;
//         code =  excelToJson({
//             source: readFileSync('../server/uploads/sample.xls') // fs.readFileSync return a Buffer
//         });
//         try{
//             unlinkSync('../server/uploads/sample.xls');
//            }catch(err){
//             console.log(err);
//            }
//     }
    
//     const newPostMessage = new PostMessage({ title, code, selectedFile, creator, tags,description })
    
//     try {
//         if(!flag){
//             newPostMessage.code = await csv().fromString(req.body.code);
//         }
//         await newPostMessage.save();
//         res.status(201).json(newPostMessage );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

export const updatePost = async (req, res) => {
    
    const { id } = req.params;
    const { mode } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { mode, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await PostMessage.findById(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    post.files.forEach(element => {
        try{
            unlinkSync(element.filePath);
            }catch(err){
                        console.log(err);
            }
    })
    

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    
    const { id } = req.params;
    if(!req.userId) return res.json({message: 'not Authenticated'})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    const index = post.likes.includes(String(req.userId));
    // const index = post.likes.findById( (id) => id === String(req.userId) );
    if(index === false){
        //like the post
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter( (id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

export const createPost = async (req, res, next) => {
    // const dir = '../server/uploads/temp';
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, {
    //         recursive: true
    //     });
    // }
    // console.log(req.body)
    // console.log(req.files);
    try{
        let filesArray = [];
        req.files.forEach(element => {
            let data = '';
            if(element.mimetype == 'application/vnd.ms-excel' || element.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            {
                data = excelToJson({
                            source: readFileSync(element.path) // fs.readFileSync return a Buffer
                            });
            }
            // else if(element.mimetype == 'text/csv')
            // {
            //     // csv()
            //     // .fromFile(csvFilePath)
            //     // .then(data)
            // }
            else if(element.mimetype == 'text/plain')
            {
                data = fs.readFileSync(element.path).toString().split('\n');
            }
            else if(element.mimetype == 'application/json')
            {
                data = JSON.parse(fs.readFileSync(element.path));
            }
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2),
                fileData: data
            }
            filesArray.push(file);
        });
        const post = req.body;
        const newPostMessage = new PostMessage({...post,
            title: req.body.title,
            code:"",
            creator: req.userId,
            name: req.body.name,
            tags: req.body.tags.split(','),
            files: filesArray,
        })
        await newPostMessage.save();
        res.status(201).send(newPostMessage);
    }catch(error){
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

export default router;