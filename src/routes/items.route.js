// Definitions

import express from "express";

const router = express.Router();

// Controller

import { getUnlistedItems, getSingleItem } from "../controllers/items.controller.js";

// Routes

router.get('/:collectionAddress/:userAddress', getUnlistedItems);
router.get('/single/:collectionAddress/:tokenId', getSingleItem);

// Export

export default router;