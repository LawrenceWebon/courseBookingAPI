const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// DB Connection
mongoose.connect("mongodb+srv://admin:admin123@zuitt.ldoiqaf.mongodb.net/Course-Booking?retryWrites=true&w=majority", {
    useNewParser: true,
    useUnifiedTopology: true
});

// Prompts msg in  the terminal
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
})