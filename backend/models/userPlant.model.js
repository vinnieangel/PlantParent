const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPlantSchema = new Schema({
    plantID: {
        type: ObjectId,
        required: true, 
        unique:true, 
    },
    givenName: {
        type: String,
        unique: true
    },
    stage: {
        type: String,
        enum: ["seed", "germinated", "sapling", "mature"],
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    wateringSchedule: {
        type: ObjectId,
    },
    fertilizingSchedule: {
        type: ObjectId,
    }
});

const userPlantModule = mongoose.model('userPlant', userPlantSchema);
module.exports = userPlantModule;