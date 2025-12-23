import express from 'express';
import {reserveSeat, cancelReservation, getEventSummary} from '../controllers/reservation.controller.js';
const router = express.Router();

router.post("/reservations", reserveSeat);
router.delete("/reservations/:reservationId", cancelReservation);
router.get("/reservations", getEventSummary);

export default router;