import { Router } from 'express';
import * as examController from '../controllers/examController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { validateRequest } from '../validators/validate';
import { examSchema } from '../validators/generalValidators';

const router = Router();

// Public routes
router.get('/', examController.getAllExams);
router.get('/:idOrSlug', examController.getExamBySlugOrId);

// Admin-only routes
router.use(protect, restrictTo('admin'));
router.post('/', validateRequest(examSchema), examController.createExam);
router.patch('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);

export default router;
