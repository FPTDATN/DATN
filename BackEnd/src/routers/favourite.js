import express from 'express';
import { create, getAll } from '../controllers/favourite.js';
const router = express.Router();

router.get('/favourite', getAll);
router.post('/favourite', create);



export default router;
