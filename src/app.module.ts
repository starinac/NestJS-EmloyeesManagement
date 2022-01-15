import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo_db:27017'),
    EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
