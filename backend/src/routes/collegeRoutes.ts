import { Router } from 'express';
import * as collegeController from '../controllers/collegeController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// Public routes
router.get('/', collegeController.getAllColleges);
router.get('/:idOrSlug', collegeController.getCollegeBySlugOrId);

// Admin-only routes
router.use(protect, restrictTo('admin'));

router.post(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
  collegeController.createCollege
);

router.patch(
  '/:id',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
  collegeController.updateCollege
);

router.delete('/:id', collegeController.deleteCollege);

export default router;
