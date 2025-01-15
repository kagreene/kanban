import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
// just need to add authenticateToken middleware to the router.use() function
router.use('/api', authenticateToken, apiRoutes);

export default router;
