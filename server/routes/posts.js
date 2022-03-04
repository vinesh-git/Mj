import express from 'express';

import { getPosts, selectPost, createPost, updatePost, likePost, deletePost, singleFileUpload } from '../controllers/posts.js';

import {upload} from '../helpers/filehelper.js';

const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', selectPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);




export default router;