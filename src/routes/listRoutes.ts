import { Router } from 'express';
import { ListApi } from '../api/lists';

const router = Router();

router.post('/lists', ListApi.createList);
router.get('/lists', ListApi.getLists);
router.get('/lists/:listId', ListApi.getListById);
router.put('/lists/:listId', ListApi.updateList);
router.delete('/lists/:listId', ListApi.deleteList);

export default router;
