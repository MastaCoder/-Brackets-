import mongoose from "../db/mongoose.js";

const TeamsSchema = new mongoose.Schema({
    
})

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    public: {
        type: Boolean,
        required: true,
    },
    maxMembers: {
        type: Number,
        required: true
    },
    members: {
        type: [String],
        required: false,
        default: []
    },
    teams: {
        type: Object
    }
})