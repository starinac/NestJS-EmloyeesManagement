import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

const employee = {
  _id: "61e3426b14df64dd25a67da2",
  name: "Petar",
  email: "petar@gmail.com",
  phoneNumber: "+38164555222",
  city: "Novi Sad",
  zip: 21000,
  adressLine1: "Prva adresa",
  dateOfEmployment: "2022-01-01",
  dateOfBirth: "1999-05-05",
  isDeleted: false
}

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {

    const employeeModel = {
      create: jest.fn().mockResolvedValue(employee),
      save: jest.fn().mockResolvedValue(employee),
      find: jest.fn().mockResolvedValue([employee]),
      findEmployee: jest.fn().mockResolvedValue(employee),
      findById: jest.fn().mockResolvedValue(employee),
      findByIdAndUpdate: jest.fn().mockResolvedValue(employee),
      findByIdAndDelete: jest.fn().mockResolvedValue(employee),
      exec: jest.fn().mockResolvedValue(employee),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService,
        {provide: getModelToken(Employee.name), useValue: employeeModel,}],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find employee', () => {
    describe('Employee with the given ID exists', () =>{
        it('should retrieve an employee with an ID', async () => {
                const employeeId = '61e3426b14df64dd25a67da2';
                const searchedEmployee = await service.findOneEmployee(employeeId);
                expect(searchedEmployee).toEqual(employee);
        });
    });
    describe('There is no employee with given ID', () =>{
        it('should throw NotFoundException ', async () => {
                const employeeId = '1';
                try {
                  await service.findOneEmployee(employeeId);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual(`Employee with ID number: ${employeeId} not found`)                     
                }
        });
    });
  });
});
