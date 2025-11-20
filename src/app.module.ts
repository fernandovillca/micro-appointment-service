import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
