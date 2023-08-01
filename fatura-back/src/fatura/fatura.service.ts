import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Fatura } from './fatura.entity';

@Injectable()
export class FaturaService {
  private readonly logger = new Logger(FaturaService.name);

  constructor(private readonly entityManager: EntityManager) {}

  async createFatura(faturaData: Partial<Fatura>): Promise<Fatura> {
    try {
      const existingFatura = await this.entityManager.findOne(Fatura, {
        where: {
          nome: faturaData.nome,
          mesReferencia: faturaData.mesReferencia,
        },
      });

      if (existingFatura) {
        const errorMessage = `Já existe uma fatura com o mesmo nome e mês de referência`;
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      const fatura = new Fatura();
      Object.assign(fatura, faturaData);
      const savedFatura = await this.entityManager.save(Fatura, fatura);
      this.logger.log(`Fatura criada com sucesso: ID ${savedFatura.id}`);
      return savedFatura;
    } catch (error) {
      this.logger.error(`Erro ao criar fatura: ${error.message}`);
      throw error;
    }
  }

  async getAllFaturas(): Promise<Fatura[]> {
    try {
      const faturas = await this.entityManager.find(Fatura);
      this.logger.log(`Recuperadas ${faturas.length} faturas`);
      return faturas;
    } catch (error) {
      this.logger.error(`Erro ao recuperar faturas: ${error.message}`);
      throw error;
    }
  }
}
