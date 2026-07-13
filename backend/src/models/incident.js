import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "flood",
        "fire",
        "earthquake",
        "cyclone",
        "landslide",
        "medical",
      ],
      required: true,
    },

    severity: {
      type: String,
      enum: ["minor", "moderate", "severe"],
      default: "moderate",
    },

    status: {
      type: String,
      enum: ["reported", "in-progress", "resolved"],
      default: "reported",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    coordinates: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },

    images:[ {
      type: String,
    }],

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;