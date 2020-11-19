const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Please enter Exercise Type"
            }
        }, 
        {
            name: {
                type: String,
                trim: true,
                required: "Please enter Exercise Name"
            }
        },
        {
            duration: {
                type: Number,
                required: "Please enter Exercise Duration in Minutes"
            }
        },
        {
            weight: {
                type: Number
            }
        },
        {
            reps: {
                type: Number
            }
        },
        {
            sets: {
                type: Number
            }
        },
        {
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;