import { Router } from 'express';
import * as savedCollegeController from '../controllers/savedCollegeController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.post('/', savedCollegeController.saveCollege);
router.delete('/:collegeId', savedCollegeController.unsaveCollege);
router.get('/', savedCollegeController.getSavedColleges);

export default router;
