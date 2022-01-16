import { Schema } from "mongoose";

export const EmployeeSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    city: {type: String, required: true},
    zip: {type: Number, required: true},
    adressLine1: {type: String, required: true},
    adressLine2: {type: String, required: false},
    dateOfEmployment: {type: Date, required: true},
    dateOfBirth: {type: Date, required: true},
    isDeleted: {type: Boolean, required: false, default: false}
});