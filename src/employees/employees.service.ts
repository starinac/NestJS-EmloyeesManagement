import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
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
    const employee = await this.findEmployee(id);

    return employee;
  }

  async findDeletedEmployees(){
    const employees = await this.employeeModel.find({isDeleted: true}).exec();
    return employees;
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const existingEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {new: true}).exec();

    if(!existingEmployee)
          throw new NotFoundException(`Employee with ID number: ${id} not found`);

    return existingEmployee;
  }

  async softDeleteEmployee(id: string) {
    let employee = await this.findEmployee(id);
    if(employee.isDeleted === true){
      throw new GoneException(`Employee with id number: ${id} is already soft deleted`);
    }
    employee.isDeleted = true;
    return this.updateEmployee(id, employee);
  }

  async removeEmployee(id: string) {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();

    if(!employee)
          throw new NotFoundException(`Employee with ID number: ${id} not found`);

    return employee;
  }

  private async findEmployee(id: string): Promise<Employee> {
    let employee;
    try {
      employee = await this.employeeModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Employee with ID number: ${id} not found`);
    }
    if (!employee) {
      throw new NotFoundException(`Employee with ID number: ${id} not found`);
    }
    return employee;
  }
}
