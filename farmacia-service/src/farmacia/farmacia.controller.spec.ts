import { Test, TestingModule } from '@nestjs/testing';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { Farmacia } from './entities/farmacia.entity';
import { FarmaciaController } from './farmacia.controller';
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

const updateFarmaciaEntity: Farmacia = new Farmacia({
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
});

describe('FarmaciaController', () => {
  let farmaciaController: FarmaciaController;
  let farmaciaService: FarmaciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmaciaController],
      providers: [
        {
          provide: FarmaciaService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(farmaciaEntity),
            findOne: jest.fn().mockResolvedValue(farmaciaEntity[0]),
            create: jest.fn().mockResolvedValue(farmaciaEntity),
            update: jest.fn().mockResolvedValue(updateFarmaciaEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    farmaciaController = module.get<FarmaciaController>(FarmaciaController);
    farmaciaService = module.get<FarmaciaService>(FarmaciaService);
  });
  farmaciaController;
  it('should be defined', () => {
    expect(farmaciaController).toBeDefined();
    expect(farmaciaService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of farmacias', async () => {
      // Arrange
      const expectedResult = await farmaciaController.findAll();

      expect(expectedResult).toEqual(farmaciaEntity);
      expect(typeof expectedResult).toBe('object');
      expect(Array.isArray(expectedResult)).toBeTruthy();
    });

    it('should return an object of farmacias', async () => {
      // Arrange
      const expectedResult = await farmaciaController.findAll();

      expect(typeof expectedResult).toBe('object');
    });

    it('should throw an exception', () => {
      jest
        .spyOn(farmaciaService, 'findAll')
        .mockRejectedValueOnce(new Error('Error'));

      expect(farmaciaController.findAll()).rejects.toThrow(new Error('Error'));
    });
  });

  describe('create', () => {
    const body: CreateFarmaciaDto = {
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
    };

    it('should create a new farmacia register', async () => {
      // Arrange
      const expectedResult = await farmaciaController.create(body);

      expect(expectedResult).toEqual(farmaciaEntity);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(farmaciaService, 'create')
        .mockRejectedValueOnce(new Error('Error'));

      expect(farmaciaController.create(body)).rejects.toThrow(
        new Error('Error'),
      );
    });
  });

  describe('findById', () => {
    it('should return just one farmacia', async () => {
      // Arrange
      const expectedResult = await farmaciaController.findOne(
        '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
      );

      expect(expectedResult).toEqual(farmaciaEntity[0]);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(farmaciaService, 'findOne')
        .mockRejectedValueOnce(new Error('Error'));

      expect(
        farmaciaController.findOne('5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723'),
      ).rejects.toThrow(new Error('Error'));
    });
  });

  describe('update', () => {
    const body: CreateFarmaciaDto = {
      nome: 'farmacia 2',
      tipo: 'filial',
      sedeId: '5a4c1c2d-9d5d-463f-8b3c-e9435c0c3723',
      endereco: 'Rua 2',
      numero: '2',
      cep: '23400000',
      bairro: 'bairro 2.5',
      cidade: 'cidade 2.5',
      estado: 'E2',
      complemento: '',
      telefone: 'fone 2',
      resposavel: 'resp 2',
      cnpj: 'cnpj 2',
      logoUrl: 'caminho 2',
      outros: 'outros 2',
      horarioFuncionamento: 'horario 2.5',
    };

    it('should update a farmacia register', async () => {
      // Arrange
      const expectedResult = await farmaciaController.update(
        '5a4c1c2d-9d5d-463f-8b3c-e9435c0e5845',
        body,
      );

      expect(expectedResult).toEqual(updateFarmaciaEntity);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(farmaciaService, 'update')
        .mockRejectedValueOnce(new Error('Error'));

      expect(
        farmaciaController.update('5a4c1c2d-9d5d-463f-8b3c-e9435c0e5845', body),
      ).rejects.toThrow(new Error('Error'));
    });
  });

  describe('delete', () => {
    it('should delete a farmacia register', async () => {
      // Arrange
      const expectedResult = await farmaciaController.remove(
        '5a4c1c2d-9d5d-463f-8b3c-e9435c0e5845',
      );

      expect(expectedResult).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest
        .spyOn(farmaciaService, 'remove')
        .mockRejectedValueOnce(new Error('Error'));

      expect(
        farmaciaController.remove('5a4c1c2d-9d5d-463f-8b3c-e9435c0e5845'),
      ).rejects.toThrow(new Error('Error'));
    });
  });
});
