import express from 'express';
import { getBids, placeBid } from '../controllers/bidController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/items/:itemId/bids', getBids);
router.post('/items/:itemId/bids', authMiddleware, placeBid);

export default router;
