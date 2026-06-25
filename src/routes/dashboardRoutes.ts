import { Router } from 'express';
import { DashboardApi } from '../api/dashboard';

const router = Router();

router.get('/dashboard/overview', DashboardApi.getDashboardOverview);

export default router;
