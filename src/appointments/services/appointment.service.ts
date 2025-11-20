import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { SlotRepository } from '../repositories/slot.repository';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { Slot } from '../entities/slot.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
    @InjectRepository(SlotRepository)
    private readonly slotRepository: SlotRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      // Buscar el slot con bloqueo pesimista para alta concurrencia
      const slot = await transactionalEntityManager
        .createQueryBuilder(Slot, 'slot')
        .setLock('pessimistic_write')
        .where('slot.id = :id AND slot.reservado = :reservado', { 
          id: createAppointmentDto.horarioSlotId, 
          reservado: false 
        })
        .getOne();

      if (!slot) {
        throw new ConflictException('El horario no está disponible o ya fue reservado');
      }

      // Validar que la fecha agendada esté dentro del slot
      const fechaAgendada = new Date(createAppointmentDto.fechaHoraAgendada);
      if (fechaAgendada < slot.inicioSlot || fechaAgendada > slot.finSlot) {
        throw new BadRequestException('La fecha agendada debe estar dentro del horario disponible');
      }

      // Marcar slot como reservado
      slot.reservado = true;
      await transactionalEntityManager.save(slot);

      // Crear la cita
      const appointment = this.appointmentRepository.create({
        pacienteGlobalId: createAppointmentDto.pacienteGlobalId,
        slot: { id: createAppointmentDto.horarioSlotId },
        fechaHoraAgendada: createAppointmentDto.fechaHoraAgendada,
        estado: createAppointmentDto.estado || 'agendada',
      });

      return await transactionalEntityManager.save(appointment);
    });
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ relations: ['slot'] });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ 
      where: { id }, 
      relations: ['slot'] 
    });
    
    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async cancel(id: number): Promise<Appointment> {
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      const appointment = await transactionalEntityManager
        .createQueryBuilder(Appointment, 'appointment')
        .setLock('pessimistic_write')
        .where('appointment.id = :id', { id })
        .leftJoinAndSelect('appointment.slot', 'slot')
        .getOne();

      if (!appointment) {
        throw new NotFoundException(`Cita con ID ${id} no encontrada`);
      }

      if (appointment.estado === 'cancelada') {
        throw new BadRequestException('La cita ya está cancelada');
      }

      appointment.estado = 'cancelada';
      
      // Liberar el slot
      if (appointment.slot) {
        appointment.slot.reservado = false;
        await transactionalEntityManager.save(appointment.slot);
      }

      return await transactionalEntityManager.save(appointment);
    });
  }

  async complete(id: number): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    if (appointment.estado === 'completada') {
      throw new BadRequestException('La cita ya está completada');
    }

    if (appointment.estado === 'cancelada') {
      throw new BadRequestException('No se puede completar una cita cancelada');
    }

    appointment.estado = 'completada';
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }

  async findByPaciente(pacienteGlobalId: string): Promise<Appointment[]> {
    return await this.appointmentRepository.findByPaciente(pacienteGlobalId);
  }

  async findByMedico(medicoGlobalId: string): Promise<Appointment[]> {
    return await this.appointmentRepository.findByMedico(medicoGlobalId);
  }

  async findByHospital(hospitalGlobalId: string): Promise<Appointment[]> {
    return await this.appointmentRepository.findByHospital(hospitalGlobalId);
  }
}