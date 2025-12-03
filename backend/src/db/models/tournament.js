import mongoose from "mongoose";
const { Schema } = mongoose;

const participantSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["REGISTERED", "WITHDRAWN", "PARTICIPATED"],
      default: "REGISTERED",
    },
  },
  {
    _id: false,
  },
);

const tournamentSchema = new Schema(
  {
    name: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    description: String,
    rules: String,

    format: {
      type: String,
      enum: ["SWISS", "ROUND_ROBIN", "KNOCKOUT", "DOUBLE_ELIMINATION"],
      required: true,
      default: "SWISS",
    },

    timeControl: {
      type: String,
      enum: ["BULLET", "BLITZ", "RAPID", "CLASSICAL", "CORRESPONDENCE"],
      required: true,
      default: "BLITZ",
    },

    location: String,
    venue: String,

    maxParticipants: {
      type: Number,
      min: 2,
      default: 32,
    },

    numberOfRounds: {
      type: Number,
      min: 1,
      default: 5,
    },

    participants: [participantSchema],

    status: {
      type: String,
      enum: ["REGISTRATION_OPEN", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"],
      default: "REGISTRATION_OPEN",
    },

    registrationDeadline: {
      type: Date,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    ratingRequirement: {
      min: Number,
      max: Number,
    },
  },
  { timestamps: true },
);

export const Tournament = mongoose.model("Tournament", tournamentSchema);
