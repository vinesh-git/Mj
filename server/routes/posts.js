import express from 'express';

import { getPosts, selectPost, createPost, updatePost, likePost, deletePost, singleFileUpload } from '../controllers/posts.js';

import {upload} from '../helpers/filehelper.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

router.patch('/:id/likePost', auth, likePost);

export default router;