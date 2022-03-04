import express from 'express';
import mongoose from 'mongoose';
import csv from 'csvtojson';

import excelToJson from 'convert-excel-to-json';
import { readFileSync,unlinkSync } from 'fs';

import PostMessage from '../models/postMessage.js';


const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const selectPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    // const { title, code, selectedFile, creator, tags,description } = req.body;
    const title = req.body.title;
    const selectedFile = req.body.selectedFile;
    const creator = req.body.creator;
    const tags = req.body.tags;
    const description = req.body.description;
    let code;
    var flag = false;
    if(req.body.code == "EMPTY" ){
        flag = true;
        code =  excelToJson({
            source: readFileSync('../server/uploads/sample.xls') // fs.readFileSync return a Buffer
        });
        try{
            unlinkSync('../server/uploads/sample.xls');
           }catch(err){
            console.log(err);
           }
    }
    
    const newPostMessage = new PostMessage({ title, code, selectedFile, creator, tags,description })
    
    try {
        if(!flag){
            newPostMessage.code = await csv().fromString(req.body.code);
        }
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, code, creator, selectedFile, tags, description } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, code, tags, selectedFile, description, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

export const singleFileUpload = async (req, res, next) => {
    try{
        res.status(201).send('File Uploaded Successfully')
    }catch(error){
        res.status(400).send(error.message);
    }
}

export default router;