import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { UpdateFarmaciaDto } from './dto/update-farmacia.dto';
import { Farmacia } from './entities/farmacia.entity';
import { FarmaciaService } from './farmacia.service';

const farmaciaEntity: Farmacia[] = [
  new Farmacia({
    id: '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
    nome: 'farmacia 1',
    tipo: 'sede',
    sedeId: '',
    endereco: 'Rua 1',
    numero: '1',
    cep: '13400000',
    bairro: 'bairro 1',
    cidade: 'cidade 1',
    estado: 'E1',
    complemento: '',
    telefone: 'fone 1',
    resposavel: 'resp 1',
    cnpj: 'cnpj 1',
    logoUrl: 'caminho 1',
    outros: 'outros 1',
    horarioFuncionamento: 'horario 1',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    deletadoEm: null,
  }),
  new Farmacia({
    id: '5a4c1c2d-9d5d-463f-8b3c-e9435c0e5845',
    nome: 'farmacia 2',
    tipo: 'filial',
    sedeId: '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
    endereco: 'Rua 2',
    numero: '2',
    cep: '23400000',
    bairro: 'bairro 2',
    cidade: 'cidade 2',
    estado: 'E2',
    complemento: '',
    telefone: 'fone 2',
    resposavel: 'resp 2',
    cnpj: 'cnpj 2',
    logoUrl: 'caminho 2',
    outros: 'outros 2',
    horarioFuncionamento: 'horario 2',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    deletadoEm: null,
  }),
  new Farmacia({
    id: '5a4c1c2d-9d5d-463f-8b3c-e9435c0d4634',
    nome: 'farmacia 3',
    tipo: 'sede',
    sedeId: '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
    endereco: 'Rua 3',
    numero: '3',
    cep: '33400000',
    bairro: 'bairro 3',
    cidade: 'cidade 3',
    estado: 'E3',
    complemento: '',
    telefone: 'fone 3',
    resposavel: 'resp 3',
    cnpj: 'cnpj 3',
    logoUrl: 'caminho 3',
    outros: 'outros 3',
    horarioFuncionamento: 'horario 3',
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    deletadoEm: null,
  }),
];

const createFarmaciaEntity: CreateFarmaciaDto = new Farmacia({
  nome: 'farmacia 4',
  tipo: 'sede',
  sedeId: '',
  endereco: 'Rua 4',
  numero: '4',
  cep: '43400000',
  bairro: 'bairro 4',
  cidade: 'cidade 4',
  estado: 'E4',
  complemento: '',
  telefone: 'fone 4',
  resposavel: 'resp 4',
  cnpj: '',
  logoUrl: 'caminho 4',
  outros: 'outros 4',
  horarioFuncionamento: 'horario 4',
});

describe('FarmaciaService', () => {
  let farmaciaService: FarmaciaService;
  let farmaciaRepository: Repository<Farmacia>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmaciaService,
        {
          provide: getRepositoryToken(Farmacia),
          useValue: {
            find: jest.fn().mockResolvedValue(farmaciaEntity),
            findOne: jest.fn().mockResolvedValue(farmaciaEntity[0]),
            create: jest.fn().mockReturnValue(createFarmaciaEntity),
            save: jest.fn().mockResolvedValue(createFarmaciaEntity),
            update: jest.fn().mockResolvedValue(createFarmaciaEntity),
            delete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    farmaciaService = module.get<FarmaciaService>(FarmaciaService);
    farmaciaRepository = module.get<Repository<Farmacia>>(
      getRepositoryToken(Farmacia),
    );
  });

  it('should be defined', () => {
    expect(farmaciaService).toBeDefined();
    expect(farmaciaRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of farmacias', async () => {
      const expectedResult = await farmaciaService.findAll();

      expect(expectedResult).toEqual(farmaciaEntity);
      expect(farmaciaRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(farmaciaRepository, 'find').mockRejectedValueOnce(new Error());

      expect(farmaciaService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a farmacia', async () => {
      const expectedResult = await farmaciaService.findOne(
        '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
      );

      expect(expectedResult).toEqual(farmaciaEntity[0]);
      expect(farmaciaRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest
        .spyOn(farmaciaRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(
        farmaciaService.findOne('5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723'),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateFarmaciaDto = {
      nome: 'farmacia 4',
      tipo: 'sede',
      sedeId: '',
      endereco: 'Rua 4',
      numero: '4',
      cep: '43400000',
      bairro: 'bairro 4',
      cidade: 'cidade 4',
      estado: 'E4',
      cnpj: '45666',
      complemento: '',
      telefone: 'fone 4',
      resposavel: 'resp 4',
      logoUrl: 'caminho 4',
      outros: 'outros 4',
      horarioFuncionamento: 'horario 4',
    };
    it('should return a farmacia', async () => {
      const expectedResult = await farmaciaService.create(body);

      expect(expectedResult).toEqual(createFarmaciaEntity);
      expect(farmaciaRepository.create).toHaveBeenCalledTimes(1);
      expect(farmaciaRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(farmaciaRepository, 'save').mockRejectedValueOnce(new Error());

      expect(
        farmaciaService.create(createFarmaciaEntity),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const body: UpdateFarmaciaDto = {
      id: '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
      nome: 'farmacia 4',
      tipo: 'sede',
      sedeId: '',
      endereco: 'Rua 4',
      numero: '4',
      cep: '43400000',
      bairro: 'bairro 4',
      cidade: 'cidade 4',
      estado: 'E4',
      complemento: '',
      telefone: 'fone 4',
      resposavel: 'resp 4',
      cnpj: '45666',
      logoUrl: 'caminho 4',
      outros: 'outros 4',
      horarioFuncionamento: 'horario 4',
    };

    it('should return a farmacia', async () => {
      const expectedResult = await farmaciaService.update(body.id, body);

      expect(expectedResult).toEqual(createFarmaciaEntity);
      expect(farmaciaRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest
        .spyOn(farmaciaRepository, 'update')
        .mockRejectedValueOnce(new Error());

      expect(
        farmaciaService.update(body.id, createFarmaciaEntity),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a farmacia register', async () => {
      const expectedResult = await farmaciaService.remove(
        '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
      );

      expect(expectedResult).toBeUndefined();
      expect(farmaciaRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest
        .spyOn(farmaciaRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      expect(
        farmaciaService.remove('5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723'),
      ).rejects.toThrowError();
    });
  });
});
