import { Router } from 'express';
import * as comparedCollegeController from '../controllers/comparedCollegeController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.post('/', comparedCollegeController.addToCompare);
router.delete('/:collegeId', comparedCollegeController.removeFromCompare);
router.get('/', comparedCollegeController.getComparedColleges);

export default router;
