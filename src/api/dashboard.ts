import { Request, Response } from 'express';
import { DashboardController } from '../controllers/DashboardController';

export class DashboardApi {
  static async getDashboardOverview(req: Request, res: Response): Promise<void> {
    try {
      const overviewData = DashboardController.getDashboardOverview();
      res.status(200).json(overviewData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
