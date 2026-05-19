const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected")
})
.catch((err) => {
    console.log("MongoDB connection error:", err)
})

// Lead Schema
const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    course: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Lead Model
const Lead = mongoose.model("Lead", leadSchema)

// Test Route
app.get("/", (req, res) => {
    res.send("Backend running")
})

// Form Submission API
app.post("/submit-form", async (req, res) => {

    try {

        console.log("Received Data:", req.body)

        const newLead = new Lead(req.body)

        await newLead.save()

        res.status(200).json({
            success: true,
            message: "Lead saved successfully"
        })

    } catch(error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: "Error saving lead"
        })

    }

})

// Server Start
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})