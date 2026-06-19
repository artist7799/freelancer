import { Router } from 'express';
import * as blogController from '../controllers/blogController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';
import { validateRequest } from '../validators/validate';
import { blogSchema } from '../validators/generalValidators';

const router = Router();

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:idOrSlug', blogController.getBlogBySlugOrId);

// Admin-only routes
router.use(protect, restrictTo('admin'));
router.post('/', upload.single('image'), validateRequest(blogSchema), blogController.createBlog);
router.patch('/:id', upload.single('image'), blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
