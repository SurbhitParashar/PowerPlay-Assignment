import mongoose from "mongoose";
import { type } from "os";

const reservationSchema = new mongoose.Schema({
    reservationId:{
        type:String,
        required:true,
        unique:true
    },
    partnerId: String,
    seats:Number,
    status:{
        type:String,
        enum:["CONFIRMED","CANCELLED"],
        default:"CONFIRMED"
    },
    
});

export default mongoose.model("Reservation",reservationSchema);