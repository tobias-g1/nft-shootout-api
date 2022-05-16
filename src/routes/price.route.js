// Definitions

import express from "express";

const router = express.Router();

// Controller

import { getCurrentPrice} from "../controllers/price.controller.js";

// Routes

router.get('/current', getCurrentPrice);

// Export

export default router;