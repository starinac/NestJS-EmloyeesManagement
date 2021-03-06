import { IsDateString, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    readonly name: string;
    @IsEmail()
    readonly email: string;
    @IsPhoneNumber()
    readonly phoneNumber: string;
    @IsString()
    readonly city: string;
    @IsNumber()
    readonly zip: number;
    @IsString()
    readonly adressLine1: string;
    @IsOptional()
    @IsString()
    readonly adressLine2: string;
    @IsDateString()
    readonly dateOfEmployment: Date;
    @IsDateString()
    readonly dateOfBirth: Date;
    @IsOptional()
    readonly isDeleted: boolean = false;
}
