import { Router } from 'express';
import { getCurrentUser } from '../controllers/sessionController';


const router = Router();


router.get('/', getCurrentUser);


export { router as meRouter };
