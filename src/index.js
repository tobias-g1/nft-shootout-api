
// Imports

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// Route Imports

import marketplace from "./routes/marketplace.route.js";
import items from "./routes/items.route.js";
import price from "./routes/price.route.js";

// App

const app = express()

// Require Env
import { config } from "dotenv";
config();

// Initialize Middleware

app.use(helmet());
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Routes

app.use('/marketplace', marketplace);
app.use('/items', items);
app.use('/price', price);

// Start Listening

const listener = app.listen(process.env.PORT || 8082, () => {
    console.log('Listening on port ' + listener.address().port);
});

import './utils/db.js'
