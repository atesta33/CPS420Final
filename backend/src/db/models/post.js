import mongoose from "mongoose";
const { Schema } = mongoose;

const bidSchema = new Schema(
  {
    bidder: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    contents: String,
    tags: [String],

    startingPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    bids: [bidSchema],

    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },

    startTime: {
      type: Date,
      default: Date.now,
    },

    endTime: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
