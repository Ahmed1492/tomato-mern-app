import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOder, getUserOrders, getOrders, OrderupdateStatus, getOrderHistory } from '../controller/order.controller.js';

const router = Router();

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOder);
router.get('/orders', getOrders);
router.get('/user-orders', authMiddleware, getUserOrders);
router.get('/history', authMiddleware, getOrderHistory);
router.put('/update-status', OrderupdateStatus);

export default router;
