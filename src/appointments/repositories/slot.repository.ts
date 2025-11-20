import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Slot } from '../entities/slot.entity';

@Injectable()
export class SlotRepository extends Repository<Slot> {
  constructor(private dataSource: DataSource) {
    super(Slot, dataSource.createEntityManager());
  }

  async findAvailableSlots(medicoGlobalId?: string, hospitalGlobalId?: string): Promise<Slot[]> {
    const query = this.createQueryBuilder('slot')
      .where('slot.reservado = :reservado', { reservado: false });

    if (medicoGlobalId) {
      query.andWhere('slot.medico_global_id = :medicoGlobalId', { medicoGlobalId });
    }

    if (hospitalGlobalId) {
      query.andWhere('slot.hospital_global_id = :hospitalGlobalId', { hospitalGlobalId });
    }

    return query.getMany();
  }

  async findSlotsByMedico(medicoGlobalId: string): Promise<Slot[]> {
    return this.find({
      where: { medicoGlobalId },
      order: { inicioSlot: 'ASC' }
    });
  }

  async findSlotsByHospital(hospitalGlobalId: string): Promise<Slot[]> {
    return this.find({
      where: { hospitalGlobalId },
      order: { inicioSlot: 'ASC' }
    });
  }
}