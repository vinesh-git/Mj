import express from 'express';

import { getPostsBySearch, getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

import {upload} from '../helpers/filehelper.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createpost', auth, upload.array('files'), createPost);

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
// router.post('/', auth, upload.array('files'), createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);




export default router;