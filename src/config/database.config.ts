import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Slot } from '../appointments/entities/slot.entity';
import { Appointment } from '../appointments/entities/appointment.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'appointments_db',
  entities: [Slot, Appointment],
  synchronize: true, // En producción usar migraciones
  logging: process.env.NODE_ENV !== 'production',
};