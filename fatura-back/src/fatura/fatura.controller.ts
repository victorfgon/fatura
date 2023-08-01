import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { FaturaService } from './fatura.service';
import { Fatura } from './fatura.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParserService } from './parser.service';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('faturas')
@Controller('faturas')
export class FaturaController {
  private readonly logger = new Logger(FaturaController.name);

  constructor(
    private readonly faturaService: FaturaService,
    private readonly parserService: ParserService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo PDF da fatura a ser carregado',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Fatura criada com sucesso',
    type: Fatura,
  })
  @ApiResponse({ status: 400, description: 'Arquivo inválido' })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadFatura(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Fatura> {
    try {
      this.logger.log('Iniciando o processamento do arquivo PDF da fatura...');
      const pdfBuffer = file.buffer;
      const pdfData = await this.parserService.parseFatura(pdfBuffer);
      return await this.faturaService.createFatura(pdfData);
    } catch (error) {
      this.logger.error(
        'Erro ao processar o arquivo PDF da fatura:',
        error.stack,
      );

      throw new HttpException(
        { message: 'Arquivo inválido. Detalhes do erro: ' + error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todas as faturas',
    type: Fatura,
    isArray: true,
  })
  async getAllFaturas(): Promise<Fatura[]> {
    return this.faturaService.getAllFaturas();
  }
}
