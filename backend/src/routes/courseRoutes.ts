import { Router } from 'express';
import * as courseController from '../controllers/courseController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { validateRequest } from '../validators/validate';
import { courseSchema } from '../validators/generalValidators';

const router = Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Admin-only routes
router.use(protect, restrictTo('admin'));
router.post('/', validateRequest(courseSchema), courseController.createCourse);
router.patch('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;
