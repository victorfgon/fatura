import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { FaturaModule } from './fatura/fatura.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), FaturaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
