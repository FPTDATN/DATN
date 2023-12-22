import express from 'express';
import { deleteDiscountUsers, getAllDiscountUsers, saveDiscountToAnotherTable } from '../controllers/discountuser.js';
const router = express.Router();
router.post('/discountsuser/:discountId',saveDiscountToAnotherTable);
router.get('/discountsuser',getAllDiscountUsers);
router.delete('/discountsuser/:discountId',deleteDiscountUsers);
export default router;
