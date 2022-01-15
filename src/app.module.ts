import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://nikola:D5cbK5XrxuRu86SS@cluster0.hfb3c.mongodb.net/employees?retryWrites=true&w=majority'),
    EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
