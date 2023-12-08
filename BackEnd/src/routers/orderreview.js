import express from 'express';
import { createOrderComment, getByIdOrderComment, getOrderComments, removeOrderComment, updateOrderComment } from '../controllers/orderreview.js';

const router = express.Router();

router.get('/ordercomments', getOrderComments);
router.post('/ordercomments', createOrderComment);
router.delete('/ordercomments/:id',removeOrderComment);
router.put('/ordercomments/:id',updateOrderComment)
router.get('/ordercomments/:id',getByIdOrderComment)




export default router;
