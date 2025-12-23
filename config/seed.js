import Event from "../models/event.model.js";

export const seedEvent=async(req,res)=>{
    const eventExists = await Event.findOne({eventId:"node-meetup-2025"});

    if(!eventExists){
        const event = await Event.create({
            eventId:"node-meetup-2025",
            name:"Node.js Meet-up",
            totalSeats:500,
            availableSeats:500,
            version:0
        });
        return res.status(201).json({message:"Event seeded successfully",event});
    }
    
    console.log("Event already seeded successfully");
    return;
}
