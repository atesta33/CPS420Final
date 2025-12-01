import express from "express"
import { Message } from "../db/models/messages.js"
// import { getDMRoom } from "../services/dm.js"
import mongoose from "mongoose"

export const conversationsRoutes = express.Router()

// GET 
conversationsRoutes.get("/", async (req, res) => {
  const userId = req.query.userId
  if (!userId) return res.status(400).json({ error: "Missing userId" })

  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { from: new mongoose.Types.ObjectId(userId) },
            { to: new mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$room",
          lastMessage: { $first: "$text" },
          lastFrom: { $first: "$from" },
          lastTo: { $first: "$to" },
          timestamp: { $first: "$createdAt" }
        }
      },
      { $sort: { timestamp: -1 } }
    ])

    res.json(messages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load conversations" })
  }
})
