import express from 'express';

import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProduct)

router.post('/', createProduct)

// router.patch -> it is used to update some fields of the product 
// router.put -> it is used to update all the fields of the product
router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

export default router;