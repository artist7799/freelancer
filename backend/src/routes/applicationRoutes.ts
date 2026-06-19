import { Router } from 'express';
import * as applicationController from '../controllers/applicationController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { validateRequest } from '../validators/validate';
import { applicationSchema } from '../validators/generalValidators';

const router = Router();

// Protected routes (available to students/admins)
router.use(protect);
router.post('/', validateRequest(applicationSchema), applicationController.submitApplication);
router.get('/my', applicationController.getMyApplications);

// Admin-only routes
router.get('/', restrictTo('admin'), applicationController.getAllApplications);
router.patch('/:id/status', restrictTo('admin'), applicationController.updateApplicationStatus);

export default router;
