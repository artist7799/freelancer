import { Router } from 'express';
import * as scholarshipController from '../controllers/scholarshipController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { validateRequest } from '../validators/validate';
import { scholarshipSchema } from '../validators/generalValidators';

const router = Router();

// Public routes
router.get('/', scholarshipController.getAllScholarships);
router.get('/:idOrSlug', scholarshipController.getScholarshipBySlugOrId);

// Admin-only routes
router.use(protect, restrictTo('admin'));
router.post('/', validateRequest(scholarshipSchema), scholarshipController.createScholarship);
router.patch('/:id', scholarshipController.updateScholarship);
router.delete('/:id', scholarshipController.deleteScholarship);

export default router;
