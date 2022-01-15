import { Document } from "mongoose";

export class Employee extends Document {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
    zip: number;
    adressLine1: string;
    adressLine2: string;
    dateOfEmployment: Date;
    dateOfBirth: Date;
}
