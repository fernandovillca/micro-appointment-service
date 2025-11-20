import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt, IsOptional, IsEnum } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID global del paciente',
    example: 'paciente_789',
  })
  @IsString()
  pacienteGlobalId: string;

  @ApiProperty({
    description: 'ID del slot a reservar',
    example: 12,
  })
  @IsInt()
  horarioSlotId: number;

  @ApiProperty({
    description: 'Fecha y hora en la que se agenda la cita',
    example: '2025-11-20T09:00:00Z',
  })
  @IsDateString()
  fechaHoraAgendada: Date;

  @ApiProperty({
    required: false,
    enum: ['agendada', 'cancelada', 'completada'],
    description: 'Estado actual de la cita',
    example: 'agendada',
  })
  @IsOptional()
  @IsEnum(['agendada', 'cancelada', 'completada'])
  estado?: 'agendada' | 'cancelada' | 'completada';
}
