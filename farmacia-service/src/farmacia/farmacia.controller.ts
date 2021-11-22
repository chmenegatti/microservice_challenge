import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmaciaService } from './farmacia.service';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';

@Controller('farmacia')
export class FarmaciaController {
  constructor(private readonly farmaciaService: FarmaciaService) {}

  @Post()
  create(@Body() createFarmaciaDto: CreateFarmaciaDto) {
    return this.farmaciaService.create(createFarmaciaDto);
  }

  @Get()
  findAll() {
    return this.farmaciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmaciaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFarmaciaDto: UpdateFarmaciaDto,
  ) {
    return this.farmaciaService.update(id, updateFarmaciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmaciaService.remove(id);
  }
}
