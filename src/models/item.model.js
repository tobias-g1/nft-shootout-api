// Definitions

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
      collectionAddress: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: false,
        default: null
      },
      description: {
        type: String,
        required: false,
        default: null
      },
      image: {
        type: String,
        required: false,
        default: null
      },
      tokenId: {
        type: String,
        required: true
      },
      attributes: [{
        trait_type: {
          type: String,
          required: false,
        },
        value: {
          type: String,
          required: false,
        },
      }],
      owner: {
          type: String,
          required: true
      },
      forSale: {
        type: Boolean,
        required: false,
        default: false
    },
      listPrice: {
          type: String,
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
