import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = Router();

router.get('/admin-stats', protect, restrictTo('admin'), dashboardController.getAdminStats);

export default router;
