import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentRepository extends Repository<Appointment> {
  constructor(private dataSource: DataSource) {
    super(Appointment, dataSource.createEntityManager());
  }

  async findByPaciente(pacienteGlobalId: string): Promise<Appointment[]> {
    return this.find({
      where: { pacienteGlobalId },
      relations: ['slot'],
      order: { fechaHoraAgendada: 'ASC' }
    });
  }

  async findByMedico(medicoGlobalId: string): Promise<Appointment[]> {
    return this.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.slot', 'slot')
      .where('slot.medico_global_id = :medicoGlobalId', { medicoGlobalId })
      .orderBy('appointment.fecha_hora_agendada', 'ASC')
      .getMany();
  }

  async findByHospital(hospitalGlobalId: string): Promise<Appointment[]> {
    return this.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.slot', 'slot')
      .where('slot.hospital_global_id = :hospitalGlobalId', { hospitalGlobalId })
      .orderBy('appointment.fecha_hora_agendada', 'ASC')
      .getMany();
  }
}