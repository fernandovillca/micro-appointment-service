import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlotRepository } from '../repositories/slot.repository';
import { Slot } from '../entities/slot.entity';
import { CreateSlotDto } from '../dto/create-slot.dto';
import { UpdateSlotDto } from '../dto/update-slot.dto';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(SlotRepository)
    private readonly slotRepository: SlotRepository,
  ) {}

  async create(createSlotDto: CreateSlotDto): Promise<Slot> {
    const slot = this.slotRepository.create(createSlotDto);
    return await this.slotRepository.save(slot);
  }

  async findAll(): Promise<Slot[]> {
    return await this.slotRepository.find();
  }

  async findAvailable(medicoGlobalId?: string, hospitalGlobalId?: string): Promise<Slot[]> {
    return await this.slotRepository.findAvailableSlots(medicoGlobalId, hospitalGlobalId);
  }

  async findOne(id: number): Promise<Slot> {
    const slot = await this.slotRepository.findOne({ where: { id } });
    if (!slot) {
      throw new NotFoundException(`Slot con ID ${id} no encontrado`);
    }
    return slot;
  }

  async update(id: number, updateSlotDto: UpdateSlotDto): Promise<Slot> {
    const slot = await this.findOne(id);
    Object.assign(slot, updateSlotDto);
    return await this.slotRepository.save(slot);
  }

  async remove(id: number): Promise<void> {
    const slot = await this.findOne(id);
    await this.slotRepository.remove(slot);
  }

  async findByMedico(medicoGlobalId: string): Promise<Slot[]> {
    return await this.slotRepository.findSlotsByMedico(medicoGlobalId);
  }

  async findByHospital(hospitalGlobalId: string): Promise<Slot[]> {
    return await this.slotRepository.findSlotsByHospital(hospitalGlobalId);
  }
}