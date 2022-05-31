// Definitions

import express from "express";
const router = express.Router();

// Controller

import { getListedNFTs,  getListedCollectionItemsByAddress, getFilterOptions} from "../controllers/marketplace.controller.js";

// Routes

router.get('/listed/:collectionAddress', getListedNFTs);
router.get('/listed/:collectionAddress/:userAddress', getListedCollectionItemsByAddress);
router.get('/attributes/:collectionAddress', getFilterOptions);

// Export

export default router;