import express from 'express';
import {connectMongoDB} from './config/connection.js'
import 'dotenv/config';
import reservationRoutes from './routes/reservation.route.js';
import { seedEvent } from './config/seed.js';

const app = express();
app.use(express.json());

connectMongoDB(process.env.MONGODB_URL).then(() => {
    console.log("Database connection established");
});
seedEvent();

app.use("/",reservationRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});