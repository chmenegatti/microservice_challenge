import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';
import { Farmacia } from './entities/farmacia.entity';

@Injectable()
export class FarmaciaService {
  constructor(
    @InjectRepository(Farmacia)
    private readonly farmaciaRepository: Repository<Farmacia>,
  ) {}

  async create(
    createFarmaciaDto: CreateFarmaciaDto,
  ): Promise<Farmacia | object> {
    const { tipo, sedeId } = createFarmaciaDto;

    if (tipo === 'filial') {
      const filiaisPorSede = await this.farmaciaRepository.find({
        where: { sedeId },
      });

      if (filiaisPorSede.length > 2) {
        return { mensagem: 'Limite de Filiais por Sede atingido' };
      }
    }

    const farmacia = this.farmaciaRepository.create(createFarmaciaDto);

    return this.farmaciaRepository.save(farmacia);
  }

  async findAll(): Promise<Farmacia[]> {
    const getAllFarmacias = await this.farmaciaRepository.find();
    return getAllFarmacias;
  }

  async findOne(id: string): Promise<Farmacia> {
    const farmacia = await this.farmaciaRepository.findOne(id);
    return farmacia;
  }

  async update(
    id: string,
    updateFarmaciaDto: UpdateFarmaciaDto,
  ): Promise<Farmacia | object> {
    const farmacia = await this.farmaciaRepository.findOne(id);

    if (!farmacia) {
      return { mensagem: 'Farmacia não encontrada' };
    }

    const updatedFarmacia = await this.farmaciaRepository.update(
      id,
      updateFarmaciaDto,
    );

    return updatedFarmacia;
  }

  async remove(id: string): Promise<number | object> {
    const farmacia = this.farmaciaRepository.findOne(id);

    if (!farmacia) {
      return { mensagem: 'Farmacia não encontrada' };
    }

    const removeFarmacia = await this.farmaciaRepository.delete(id);

    return removeFarmacia;
  }
}
