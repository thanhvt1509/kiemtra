import express from 'express';
import { create, get, remove, update } from '../controllers/product';

const router = express.Router();

router.post('/products', create)
router.get('/products', get)
router.get('/products/:id', get)
router.delete('/products/:id', remove)
router.put('/products/:id', update)



export default router