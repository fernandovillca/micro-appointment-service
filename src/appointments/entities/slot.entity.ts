import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  OneToMany,
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('horarios_disponibles')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'medico_global_id', type: 'varchar', length: 255 })
  medicoGlobalId: string;

  @Column({ name: 'hospital_global_id', type: 'varchar', length: 255 })
  hospitalGlobalId: string;

  @Column({ name: 'inicio_slot', type: 'timestamp' })
  inicioSlot: Date;

  @Column({ name: 'fin_slot', type: 'timestamp' })
  finSlot: Date;

  @Column({ name: 'reservado', type: 'boolean', default: false })
  reservado: boolean;

  @VersionColumn()
  version: number;

  @OneToMany(() => Appointment, (appointment) => appointment.slot)
  appointments: Appointment[];

  constructor(partial?: Partial<Slot>) {
    Object.assign(this, partial);
  }
}
