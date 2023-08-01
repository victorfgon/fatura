import { Test, TestingModule } from '@nestjs/testing';
import { FaturaService } from './fatura.service';
import { EntityManager } from 'typeorm';
import { Fatura } from './fatura.entity';

describe('FaturaService', () => {
  let faturaService: FaturaService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaturaService,
        {
          provide: EntityManager,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    faturaService = module.get<FaturaService>(FaturaService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(faturaService).toBeDefined();
  });

  describe('createFatura', () => {
    it('should create a new fatura when fatura with same name and mesReferencia does not exist', async () => {
      const faturaData: Partial<Fatura> = {
        cliente: '3004298116',
        instalacao: '3004298116',
        nome: 'João Fulano',
        cep: '35182-036',
        mesReferencia: 'FEV/23',
        dataVencimento: '08/03/2023',
        energiaEletricaKwh: 100,
        energiaEletricaPrecoUnit: 0.83394409,
        energiaEletricaValor: 83.38,
        valorTotal: 161.3,
      };

      entityManager.findOne = jest.fn().mockResolvedValue(null);

      const savedFatura: Partial<Fatura> = { ...faturaData, id: 1 };
      entityManager.save = jest.fn().mockResolvedValue(savedFatura);

      const result = await faturaService.createFatura(faturaData);

      expect(result).toEqual(savedFatura);
      expect(entityManager.findOne).toBeCalledWith(Fatura, {
        where: {
          nome: faturaData.nome,
          mesReferencia: faturaData.mesReferencia,
        },
      });
      expect(entityManager.save).toBeCalledWith(Fatura, expect.any(Fatura));
    });

    it('should throw an error if fatura with same name and mesReferencia already exists', async () => {
      const faturaData: Partial<Fatura> = {
        cliente: '3004298116',
        instalacao: '3004298116',
        nome: 'João Fulano',
        cep: '35182-036',
        mesReferencia: 'FEV/23',
        dataVencimento: '08/03/2023',
        energiaEletricaKwh: 100,
        energiaEletricaPrecoUnit: 0.83394409,
        energiaEletricaValor: 83.38,
        valorTotal: 161.3,
      };

      const existingFatura: Fatura = {
        id: 1,
        cliente: '3004298116',
        instalacao: '3004298116',
        nome: 'João Fulano',
        cep: '35182-036',
        mesReferencia: 'FEV/23',
        dataVencimento: '08/03/2023',
        energiaEletricaKwh: 100,
        energiaEletricaPrecoUnit: 0.83394409,
        energiaEletricaValor: 83.38,
        valorTotal: 161.3,
        energiaInjetadaHfpKwh: 0,
        energiaInjetadaHfpPrecoUnit: 0,
        energiaInjetadaHfpValor: 0,
        enCompSemIcmsKwh: 0,
        enCompSemIcmsPrecoUnit: 0,
        enCompSemIcmsValor: 0,
        contribIlumPublicaMunicipal: 0,
        taxa2Via: 0,
      };
      entityManager.findOne = jest.fn().mockResolvedValue(existingFatura);

      await expect(
        faturaService.createFatura(faturaData),
      ).rejects.toThrowError();
      expect(entityManager.findOne).toBeCalledWith(Fatura, {
        where: {
          nome: faturaData.nome,
          mesReferencia: faturaData.mesReferencia,
        },
      });
      expect(entityManager.save).not.toBeCalled();
    });
  });

  describe('getAllFaturas', () => {
    it('should return an array of faturas', async () => {
      const faturas: Fatura[] = [
        {
          id: 1,
          cliente: '3004298116',
          instalacao: '3004298116',
          nome: 'João Fulano',
          cep: '35182-036',
          mesReferencia: 'FEV/23',
          dataVencimento: '08/03/2023',
          energiaEletricaKwh: 100,
          energiaEletricaPrecoUnit: 0.83394409,
          energiaEletricaValor: 83.38,
          valorTotal: 161.3,
          energiaInjetadaHfpKwh: 0,
          energiaInjetadaHfpPrecoUnit: 0,
          energiaInjetadaHfpValor: 0,
          enCompSemIcmsKwh: 0,
          enCompSemIcmsPrecoUnit: 0,
          enCompSemIcmsValor: 0,
          contribIlumPublicaMunicipal: 0,
          taxa2Via: 0,
        },
        {
          id: 2,
          cliente: '7202788969',
          instalacao: '3004298116',
          nome: 'Maria Silva',
          cep: '35182-036',
          mesReferencia: 'MAR/23',
          dataVencimento: '08/04/2023',
          energiaEletricaKwh: 150,
          energiaEletricaPrecoUnit: 0.72234192,
          energiaEletricaValor: 108.35,
          valorTotal: 200.0,
          energiaInjetadaHfpKwh: 0,
          energiaInjetadaHfpPrecoUnit: 0,
          energiaInjetadaHfpValor: 0,
          enCompSemIcmsKwh: 0,
          enCompSemIcmsPrecoUnit: 0,
          enCompSemIcmsValor: 0,
          contribIlumPublicaMunicipal: 0,
          taxa2Via: 0,
        },
      ];

      entityManager.find = jest.fn().mockResolvedValue(faturas);

      const result = await faturaService.getAllFaturas();

      expect(result).toEqual(faturas);
      expect(entityManager.find).toBeCalledWith(Fatura);
    });
  });
});
