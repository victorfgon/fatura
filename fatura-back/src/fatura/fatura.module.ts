import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaturaController } from './fatura.controller';
import { FaturaService } from './fatura.service';
import { Fatura } from './fatura.entity';
import { ParserService } from './parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fatura])],
  controllers: [FaturaController],
  providers: [FaturaService, ParserService],
})
export class FaturaModule {}
