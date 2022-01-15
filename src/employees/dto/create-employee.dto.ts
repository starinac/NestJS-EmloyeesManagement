export class CreateEmployeeDto {
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly city: string;
    readonly zip: number;
    readonly adressLine1: string;
    readonly adressLine2: string;
    readonly dateOfEmployment: Date;
    readonly dateOfBirth: Date;
}
