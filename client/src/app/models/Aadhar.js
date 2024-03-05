import mongoose from "mongoose";
// Define the Aadhar schema
const AadharSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true // Ensures that each Aadhar number is unique in the database
    },
    // You can add more fields as needed
});
const AadharData = mongoose.models.AadharData || mongoose.model("AadharData", AadharSchema);

export default AadharData;
