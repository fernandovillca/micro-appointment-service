import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotController } from './controllers/slot.controller';
import { AppointmentController } from './controllers/appointment.controller';
import { SlotService } from './services/slot.service';
import { AppointmentService } from './services/appointment.service';
import { SlotRepository } from './repositories/slot.repository';
import { AppointmentRepository } from './repositories/appointment.repository';
import { Slot } from './entities/slot.entity';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slot, Appointment]),
  ],
  controllers: [SlotController, AppointmentController],
  providers: [
    SlotService,
    AppointmentService,
    SlotRepository,
    AppointmentRepository,
  ],
  exports: [SlotService, AppointmentService],
})
export class AppointmentsModule {}