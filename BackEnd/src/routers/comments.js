import express from 'express';
import { getComments, createComment, removeComment, updateComment, getByIdComment } from '../controllers/comments.js';
const router = express.Router();

router.get('/comments', getComments);
router.post('/comments', createComment);
router.delete('/comments/:id',removeComment);
router.put('/comments/:id',updateComment)
router.get('/comments/:id',getByIdComment)

export default router;
