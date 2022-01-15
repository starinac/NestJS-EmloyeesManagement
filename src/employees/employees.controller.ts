import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationParams } from 'src/pagination/pagination.params';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get()
  findAll(@Query() {skip, limit}: PaginationParams) {
    return this.employeesService.findAllEmployees(skip, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOneEmployee(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.removeEmployee(id);
  }
}
