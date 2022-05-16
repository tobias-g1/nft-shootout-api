// Definitions

import express from "express";
const router = express.Router();

// Controller

import { getListedNFTs,  getListedCollectionItemsByAddress} from "../controllers/marketplace.controller.js";

// Routes

router.get('/listed/:collectionAddress', getListedNFTs);
router.get('/listed/:collectionAddress/:userAddress', getListedCollectionItemsByAddress);

// Export

export default router;