import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventId:{
        type:String,
        required:true,
        unique:true
    },
    name: String,
    totalSeats: Number,
    availableSeats: Number,
    version:Number
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema)
