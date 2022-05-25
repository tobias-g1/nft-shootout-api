// Definitions

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema

const CollectionSchema = new Schema(
  {
    uri: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
  },
  { timestamps: true }
);

// Define model

const Collection = mongoose.model("Collections", CollectionSchema);

// Export model

export default Collection;
