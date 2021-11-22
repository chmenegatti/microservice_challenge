import { Module } from '@nestjs/common';
import { FarmaciaService } from './farmacia.service';
import { FarmaciaController } from './farmacia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmacia } from './entities/farmacia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmacia])],
  controllers: [FarmaciaController],
  providers: [FarmaciaService],
})
export class FarmaciaModule {}
