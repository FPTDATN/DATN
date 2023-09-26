import express from 'express';
import { getComments, createComment, removeComment, updateComment } from '../controllers/comments';
const router = express.Router();

router.get('/comments', getComments);
router.post('/comments', createComment);
router.delete('/comments/:id',removeComment);
router.patch('/comments/:id',updateComment)

export default router;
