import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsOptional()
    readonly name: string;
    @IsOptional()
    readonly email: string;
    @IsOptional()
    readonly phoneNumber: string;
    @IsOptional()
    readonly city: string;
    @IsOptional()
    readonly zip: number;
    @IsOptional()
    readonly adressLine1: string;
    @IsOptional()
    readonly adressLine2: string;
    @IsOptional()
    readonly dateOfEmployment: Date;
    @IsOptional()
    readonly dateOfBirth: Date;
}
