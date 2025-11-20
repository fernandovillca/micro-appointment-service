import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Slot } from './slot.entity';

export type AppointmentStatus = 'agendada' | 'cancelada' | 'completada';

@Entity('cita')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'paciente_global_id', type: 'varchar', length: 255 })
  pacienteGlobalId: string;

  @ManyToOne(() => Slot, (slot) => slot.appointments, { eager: true })
  @JoinColumn({ name: 'horario_slot_id' })
  slot: Slot;

  @Column({ name: 'fecha_hora_agendada', type: 'timestamp' })
  fechaHoraAgendada: Date;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: ['agendada', 'cancelada', 'completada'],
    default: 'agendada',
  })
  estado: AppointmentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial?: Partial<Appointment>) {
    Object.assign(this, partial);
  }
}
