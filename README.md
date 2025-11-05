# Appointment Service

Microservicio principal del sistema, responsable de **gestionar las citas médicas**.  
Soporta alta concurrencia, para bloqueo de horarios y **RabbitMQ** para emitir eventos de creación o cancelación de citas.

---

## Tecnologías

- TypeScript - NestJS
- MongoDB
- RabbitMQ (Mensajería)

---

## Ejecución local

```bash
npm install
npm run start:dev
```
