const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        unique: true
    },
    plants: {
        type: [ObjectId],
        required:true
    }
});

const gardenModule = mongoose.model('garden', gardenSchema);
module.exports = gardenModule;