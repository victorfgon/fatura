import { Test, TestingModule } from '@nestjs/testing';
import { FaturaController } from './fatura.controller';
import { FaturaService } from './fatura.service';
import { ParserService } from './parser.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Fatura } from './fatura.entity';
import { Readable } from 'typeorm/platform/PlatformTools';

describe('FaturaController', () => {
  let faturaController: FaturaController;
  let faturaService: FaturaService;
  let parserService: ParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaturaController],
      providers: [
        {
          provide: FaturaService,
          useValue: {
            createFatura: jest.fn(),
            getAllFaturas: jest.fn(),
          },
        },
        {
          provide: ParserService,
          useValue: {
            parseFatura: jest.fn(),
          },
        },
      ],
    }).compile();

    faturaController = module.get<FaturaController>(FaturaController);
    faturaService = module.get<FaturaService>(FaturaService);
    parserService = module.get<ParserService>(ParserService);
  });

  describe('uploadFatura', () => {
    it('deve criar uma nova fatura a partir do arquivo PDF enviado', async () => {
      const pdfDataMock: Partial<Fatura> = {
        // Dados do PDF mockado
      };
      jest
        .spyOn(parserService, 'parseFatura')
        .mockResolvedValue(pdfDataMock as Fatura);

      const createdFatura: Fatura = {
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
      jest
        .spyOn(faturaService, 'createFatura')
        .mockResolvedValue(createdFatura);

      const uploadedFile: Express.Multer.File = {
        buffer: Buffer.from('PDF mockado'),
        fieldname: '',
        originalname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
      };

      const result = await faturaController.uploadFatura(uploadedFile);

      expect(result).toEqual(createdFatura);
      expect(parserService.parseFatura).toHaveBeenCalledWith(
        uploadedFile.buffer,
      );
      expect(faturaService.createFatura).toHaveBeenCalledWith(pdfDataMock);
    });

    it('deve retornar erro quando ocorrer um erro no parse do arquivo', async () => {
      jest
        .spyOn(parserService, 'parseFatura')
        .mockRejectedValueOnce(new Error('Erro no parse do arquivo'));

      const uploadedFile: Express.Multer.File = {
        buffer: Buffer.from('PDF mockado aqui'),
        fieldname: '',
        originalname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
      };

      await expect(faturaController.uploadFatura(uploadedFile)).rejects.toThrow(
        new HttpException(
          {
            message:
              'Arquivo inválido. Detalhes do erro: Erro no parse do arquivo',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(parserService.parseFatura).toHaveBeenCalledWith(
        uploadedFile.buffer,
      );
      expect(faturaService.createFatura).not.toHaveBeenCalled();
    });
  });

  describe('getAllFaturas', () => {
    it('deve retornar a lista de todas as faturas', async () => {
      const faturasMock: Fatura[] = [
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
      jest.spyOn(faturaService, 'getAllFaturas').mockResolvedValue(faturasMock);

      const result = await faturaController.getAllFaturas();

      expect(result).toEqual(faturasMock);
      expect(faturaService.getAllFaturas).toHaveBeenCalled();
    });
  });
});
