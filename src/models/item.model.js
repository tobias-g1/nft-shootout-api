// Definitions

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema

const ItemSchema = new Schema(
  {
    collectionAddress: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    metadata: [{
      trait_type: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    }],
    owner: {
        type: String,
        required: true
    },
    listPrice: {
        type: Number,
        required: false,
        default: null
    }
  },
  { timestamps: true }
);

// Define model

const Items = mongoose.model("Items", ItemSchema);

// Export model

export default Items;
