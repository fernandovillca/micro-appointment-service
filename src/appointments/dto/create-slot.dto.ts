import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateSlotDto {
  @ApiProperty({
    description: 'ID global del médico que tendrá el slot',
    example: 'medico_123',
  })
  @IsString()
  medicoGlobalId: string;

  @ApiProperty({
    description: 'ID global del hospital donde se agenda el slot',
    example: 'hospital_456',
  })
  @IsString()
  hospitalGlobalId: string;

  @ApiProperty({
    description: 'Fecha y hora de inicio del slot',
    example: '2025-11-20T09:00:00Z',
  })
  @IsDateString()
  inicioSlot: Date;

  @ApiProperty({
    description: 'Fecha y hora de fin del slot',
    example: '2025-11-20T09:30:00Z',
  })
  @IsDateString()
  finSlot: Date;

  @ApiProperty({
    required: false,
    description: 'Indica si el slot ya está reservado',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  reservado?: boolean;
}
