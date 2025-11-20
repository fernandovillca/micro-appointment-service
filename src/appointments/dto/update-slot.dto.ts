import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSlotDto } from './create-slot.dto';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {}
