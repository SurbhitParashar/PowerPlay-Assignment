import Event from "../models/event.model.js";
import Reservation from "../models/reservation.model.js";
import crypto from "crypto";

export const reserveSeat=async(req,res)=>{
    try{
        const {partnerId,seats}=req.body;

        if (!seats || seats<=0 || seats>10){
            return res.status(400).json({message:"Seats must be between 1 and 10"});
        }

        const updateEvent=await Event.findOneAndUpdate(
            {
                eventId:"node-meetup-2025",
                availableSeats:{$gte:seats}
            },
            {
                $inc:{
                    availableSeats:-seats,
                    version:1
                }
            },
            {new:true}

        )
        if (!updateEvent){
            return res.status(409).json({ error: "Not enough seats left"})
        }

        const reservation=await Reservation.create({
            reservationId:crypto.randomUUID(),
            partnerId,
            seats,
            status:"CONFIRMED"
        })

        return res.status(201).json({
            reservationId:reservation.reservationId,
            seats:reservation.seats,
            status:reservation.status
        })
    }catch(error){
        console.error("Error reserving seats:",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const cancelReservation=async(req,res)=>{
    try{
        const {reservationId}=req.params;
        const reservation =await Reservation.findOne({reservationId});

        if (!reservation){
            return res.status(404).json({message:"Reservation not found or already cancelled"});
        }

        await Event.findOneAndUpdate(
            {eventId:"node-meetup-2025"},
            {
                $inc:{
                    availableSeats:reservation.seats,
                }
            }
        );

        await Reservation.deleteOne({reservationId});
        return res.sendStatus(204);
    }catch(error){
        console.error("Error cancelling reservation:",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}


export const getEventSummary=async(req,res)=>{
    try{
        const event = await Event.findOne({eventId:"node-meetup-2025"});

    if(!event){
        return res.status(404).json({message:"Event not found"});
    }

    const reservationCount=event.totalSeats - event.availableSeats;

    return res.status(200).json({
        eventId:event.eventId,
        name:event.name,
        totalSeats:event.totalSeats,
        availableSeats:event.availableSeats,
        reservationCount,
        versoin:event.version
    })
    }catch(error){
        console.error("Error fetching event summary:",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}