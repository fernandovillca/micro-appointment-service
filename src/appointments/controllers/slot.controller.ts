import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Patch, 
  Query,
  ParseIntPipe 
} from '@nestjs/common';
import { SlotService } from '../services/slot.service';
import { CreateSlotDto } from '../dto/create-slot.dto';
import { UpdateSlotDto } from '../dto/update-slot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('slots')
@Controller('slots')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Post()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.create(createSlotDto);
  }

  @Get()
  findAll() {
    return this.slotService.findAll();
  }

  @Get('available')
  findAvailable(
    @Query('medico') medicoGlobalId?: string,
    @Query('hospital') hospitalGlobalId?: string
  ) {
    return this.slotService.findAvailable(medicoGlobalId, hospitalGlobalId);
  }

  @Get('medico/:medicoGlobalId')
  findByMedico(@Param('medicoGlobalId') medicoGlobalId: string) {
    return this.slotService.findByMedico(medicoGlobalId);
  }

  @Get('hospital/:hospitalGlobalId')
  findByHospital(@Param('hospitalGlobalId') hospitalGlobalId: string) {
    return this.slotService.findByHospital(hospitalGlobalId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.slotService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSlotDto: UpdateSlotDto
  ) {
    return this.slotService.update(id, updateSlotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.slotService.remove(id);
  }
}