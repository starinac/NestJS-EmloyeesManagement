import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {

  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeModel.create(createEmployeeDto);
    employee.save();
    return employee;
  }

  async findAllEmployees(documentsToSkip = 0, limitOfDocuments?: number): Promise<Employee[]> {
    const employees = this.employeeModel.find().skip(documentsToSkip);

    if(limitOfDocuments){
      employees.limit(limitOfDocuments);
    }

    return employees;
  }

  async findOneEmployee(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if(!employee)
          throw new NotFoundException(`Employee with ID number: ${id} not found`);

    return employee;
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const existingEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {new: true});

    if(!existingEmployee)
          throw new NotFoundException(`Employee with ID number: ${id} not found`);

    return existingEmployee;
  }

  async removeEmployee(id: string) {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();

    if(!employee)
          throw new NotFoundException(`Employee with ID number: ${id} not found`);

    return employee;
  }
}
