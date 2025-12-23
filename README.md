

````md
# 🎟️ TicketBoss – Event Reservation API

A lightweight, real-time event ticket reservation API that prevents overselling using atomic database operations and optimistic concurrency control.

---

## Features

- Real-time seat reservation with instant accept/deny
- No overselling under concurrent requests
- MongoDB Atlas–backed persistence
- Clean RESTful API design
- pnpm-based dependency management

---

## 1️. Setup Instructions

### Prerequisites
- Node.js v18 or higher
- pnpm
- MongoDB Atlas account

### Installation

```bash
pnpm install
````

### Environment Setup

Create a `.env` file in the project root:

```env
PORT=8000
MONGO_URI=<your-mongodb-atlas-connection-string>
```

> `.env` is excluded from version control via `.gitignore`.
> An `.env.example` file is included for reference.

### Run the Application

```bash
pnpm dev
```

On first startup, the application automatically seeds the database with:

```json
{
  "eventId": "node-meetup-2025",
  "name": "Node.js Meet-up",
  "totalSeats": 500,
  "availableSeats": 500,
  "version": 0
}
```

---

## 2. API Documentation

###  Reserve Seats

**Endpoint:** `POST /reservations`

**Request Body**

```json
{
  "partnerId": "abc-corp",
  "seats": 3
}
```

**Success – 201 Created**

```json
{
  "reservationId": "uuid",
  "seats": 3,
  "status": "confirmed"
}
```

**Error Responses**

* `400 Bad Request` – seats ≤ 0 or > 10
* `409 Conflict` – insufficient seats available

---

###  Cancel Reservation

**Endpoint:** `DELETE /reservations/:reservationId`

**Success**

* `204 No Content`

**Error**

* `404 Not Found` – reservation does not exist or already cancelled

---

###  Event Summary

**Endpoint:** `GET /reservations`

**Response – 200 OK**

```json
{
  "eventId": "node-meetup-2025",
  "name": "Node.js Meet-up",
  "totalSeats": 500,
  "availableSeats": 42,
  "reservationCount": 458,
  "version": 14
}
```

**Notes**

* `reservationCount` = `totalSeats - availableSeats`
* `version` = number of successful reservation operations

---

## 3. Technical Decisions

### Architecture

* Node.js + Express for a simple and scalable REST API
* MongoDB Atlas for cloud-hosted, managed persistence
* Mongoose for schema modeling and atomic updates

### Concurrency Handling

* Seat reservations use MongoDB’s atomic `findOneAndUpdate`
* Prevents race conditions and overselling without locks or queues

### Storage Strategy

* Only essential fields are stored (`availableSeats`, `version`)
* Derived values (`reservationCount`) are calculated at read time to avoid redundancy

### Assumptions

* Single active event
* Maximum 10 seats per reservation
* No partial reservations
* Version increments only on successful seat reservations

---

## 🧪 Testing

* Manual testing using `curl`
* Parallel request testing confirms no overselling
* Conflict responses (`409`) handled correctly under load

---

## 📂 Project Structure

```text
.
├── config/
├── controllers/
├── models/
├── routes/
├── server.js
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 🏁 Submission Notes

This project demonstrates:

* Safe concurrency handling
* Clean API design
* Production-ready MongoDB usage
* Secure environment configuration


