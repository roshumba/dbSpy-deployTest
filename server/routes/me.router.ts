import { Router } from 'express';
import { getCurrentUser } from '../controllers/sessionController';


const router = Router();

// Default route for Vercel verification
// router.get('/', (req, res) => {
//   res.json({ message: 'Vercel reached /api/me route' });
// });

router.get('/', getCurrentUser);


export { router as meRouter };
