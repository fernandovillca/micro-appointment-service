import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Patch, 
  ParseIntPipe 
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('paciente/:pacienteGlobalId')
  findByPaciente(@Param('pacienteGlobalId') pacienteGlobalId: string) {
    return this.appointmentService.findByPaciente(pacienteGlobalId);
  }

  @Get('medico/:medicoGlobalId')
  findByMedico(@Param('medicoGlobalId') medicoGlobalId: string) {
    return this.appointmentService.findByMedico(medicoGlobalId);
  }

  @Get('hospital/:hospitalGlobalId')
  findByHospital(@Param('hospitalGlobalId') hospitalGlobalId: string) {
    return this.appointmentService.findByHospital(hospitalGlobalId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.cancel(id);
  }

  @Patch(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.complete(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.remove(id);
  }
}