import mongoose from "../db/mongoose.js";

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 500,
  },
  public: {
    type: Boolean,
    required: true,
  },
  maxMembers: {
    type: Number,
    required: true,
    min: 2,
    max: 100,
  },
  members: {
    type: [String],
    required: false,
    default: [],
  },
  teams: {
    type: Map,
    of: [String],
    required: false,
    default: {},
  },
  maxTeamMembers: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  userTeam: {
    type: String,
    required: false,
  },
  brackets: {
    type: [[[String]]],
    required: false,
    default: []
  },
});

export const Tournament = mongoose.model("Tournament", TournamentSchema);
