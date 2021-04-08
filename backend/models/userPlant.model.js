const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPlantSchema = new Schema({
    plantID: {
        type: String,
        required: true, 
    },
    givenName: {
        type: String,
    },
    stage: {
        type: String,
        enum: ["Seed", "Germinated", "Sapling", "Mature"],
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    wateringSchedule: {
        type: String,
    },
    fertilizingSchedule: {
        type: String,
    }
});

const userPlantModule = mongoose.model('userPlant', userPlantSchema);
module.exports = userPlantModule;