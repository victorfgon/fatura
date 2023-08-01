import { Injectable, Logger } from '@nestjs/common';
import { Fatura } from './fatura.entity';
import * as PDFParser from 'pdf-parse'; // Importe a biblioteca

@Injectable()
export class ParserService {
  private readonly logger = new Logger(ParserService.name);

  async parseFatura(pdfBuffer: Buffer): Promise<Partial<Fatura>> {
    try {
      const pdfData = await PDFParser(pdfBuffer);
      const faturaData: Partial<Fatura> = this.extractDataFromText(
        pdfData.text,
      );
      return faturaData;
    } catch (error) {
      this.logger.error(`Erro ao processar o PDF da fatura: ${error.message}`);
      throw error;
    }
  }
  private extractDataFromText(text: string): Partial<Fatura> {
    const faturaData: Partial<Fatura> = {};
    try {
      const regexNoCliente = /Nº\s*DA\s*INSTALAÇÃO\s*[^0-9]*([\d]+)/;
      const noClienteMatch = regexNoCliente.exec(text);
      faturaData.cliente = noClienteMatch[1].trim();

      const regexMesReferencia = /(\b[A-Z]{3}\/\d{2}\b)/;
      const mesReferenciaMatch = regexMesReferencia.exec(text);
      faturaData.mesReferencia = mesReferenciaMatch[1].trim();

      const regexDataVencimento = /\d{2}\/\d{2}\/\d{4}/;
      const dataVencimentoMatch = regexDataVencimento.exec(text);
      faturaData.dataVencimento = dataVencimentoMatch[0].trim();

      const regexEnergiaEletrica =
        /Energia ElétricakWh\s+([\d.,]+)\s+([\d.,]+)\s+(-?\d{1,3}(?:\.\d{3})*,\d+)\s+([\d.,]+)/;
      const energiaEletricaMatch = regexEnergiaEletrica.exec(text);
      faturaData.energiaEletricaKwh = parseFloat(
        energiaEletricaMatch[1].replace(/\./g, '').replace(',', '.'),
      );
      faturaData.energiaEletricaPrecoUnit = parseFloat(
        energiaEletricaMatch[2].replace(/\./g, '').replace(',', '.'),
      );
      faturaData.energiaEletricaValor = parseFloat(
        energiaEletricaMatch[3].replace(/\./g, '').replace(',', '.'),
      );

      const regexEnergiaInjetadaHFP =
        /Energia injetada HFPkWh\s+([\d.,]+)\s+([\d.,]+)\s+(-?\d{1,3}(?:\.\d{3})*,\d+)\s+([\d.,]+)/;
      const regexEnergiaCompensada =
        /Energia compensada GD IkWh\s+([\d.,]+)\s+([\d.,]+)\s+(-?\d{1,3}(?:\.\d{3})*,\d+)\s+([\d.,]+)/;
      const energiaInjetadaHFPMatch = regexEnergiaInjetadaHFP.exec(text);
      const energiaCompensadaMatch = regexEnergiaCompensada.exec(text);
      if (energiaInjetadaHFPMatch) {
        faturaData.energiaInjetadaHfpKwh = parseFloat(
          energiaInjetadaHFPMatch[1].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.energiaInjetadaHfpPrecoUnit = parseFloat(
          energiaInjetadaHFPMatch[2].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.energiaInjetadaHfpValor = parseFloat(
          energiaInjetadaHFPMatch[3].replace(/\./g, '').replace(',', '.'),
        );
      } else if (energiaCompensadaMatch) {
        faturaData.energiaInjetadaHfpKwh = parseFloat(
          energiaCompensadaMatch[1].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.energiaInjetadaHfpPrecoUnit = parseFloat(
          energiaCompensadaMatch[2].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.energiaInjetadaHfpValor = parseFloat(
          energiaCompensadaMatch[3].replace(/\./g, '').replace(',', '.'),
        );
      }

      const regexEnCompSemIcms =
        /En comp\. s\/ ICMSkWh\s+([\d.,]+)\s+([\d.,]+)\s+(-?\d{1,3}(?:\.\d{3})*,\d+)\s+([\d.,]+)/;
      const regexEnergiaScee =
        /Energia SCEE s\/ ICMSkWh\s+([\d.,]+)\s+([\d.,]+)\s+(-?\d{1,3}(?:\.\d{3})*,\d+)\s+([\d.,]+)/;
      const enCompSemIcmsMatch = regexEnCompSemIcms.exec(text);
      const energiaSceeMatch = regexEnergiaScee.exec(text);
      if (enCompSemIcmsMatch) {
        faturaData.enCompSemIcmsKwh = parseFloat(
          enCompSemIcmsMatch[1].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.enCompSemIcmsPrecoUnit = parseFloat(
          enCompSemIcmsMatch[2].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.enCompSemIcmsValor = parseFloat(
          enCompSemIcmsMatch[3].replace(/\./g, '').replace(',', '.'),
        );
      } else if (energiaSceeMatch) {
        faturaData.enCompSemIcmsKwh = parseFloat(
          energiaSceeMatch[1].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.enCompSemIcmsPrecoUnit = parseFloat(
          energiaSceeMatch[2].replace(/\./g, '').replace(',', '.'),
        );
        faturaData.enCompSemIcmsValor = parseFloat(
          energiaSceeMatch[3].replace(/\./g, '').replace(',', '.'),
        );
      }

      const regexContribIlumPublica =
        /Contrib Ilum Publica Municipal\s+([\d,.]+)/;
      const contribIlumPublicaMatch = regexContribIlumPublica.exec(text);
      faturaData.contribIlumPublicaMunicipal = parseFloat(
        contribIlumPublicaMatch[1].replace(/\./g, '').replace(',', '.'),
      );

      const regexValorTotal = /TOTAL\s+([\d,.]+)/;
      const valorTotalMatch = regexValorTotal.exec(text);
      faturaData.valorTotal = parseFloat(
        valorTotalMatch[1].replace(/\./g, '').replace(',', '.'),
      );

      const regexNomePessoa = /Comprovante\s*de\s*Pagamento\s*([\s\S]*?)\n/;
      const nomePessoaMatch = regexNomePessoa.exec(text);
      const regexNomePessoa2 = /\n([A-Z\s]+)\nRUA/;
      const nomePessoaMatch2 = regexNomePessoa2.exec(text);
      if (nomePessoaMatch) {
        faturaData.nome = nomePessoaMatch[1].trim();
      } else if (nomePessoaMatch2) {
        faturaData.nome = nomePessoaMatch2[1].trim();
      }

      const regexNumeroInstalacao = /\b\d{10}\b/g;
      const numerosDezDigitos = [];
      let match: any[];
      while ((match = regexNumeroInstalacao.exec(text)) !== null) {
        numerosDezDigitos.push(match[0]);
      }
      faturaData.instalacao = numerosDezDigitos[1];

      const regexCEP = /CEP\s*:\s*([\d-]+)/;
      const cepMatch = regexCEP.exec(text);
      faturaData.cep = cepMatch[1].trim();

      const regexTaxa2Via = /Taxa\s*de\s*2ª\s*via\s*de\s*débito\s*([\d,.]+)/;
      const taxa2ViaMatch = regexTaxa2Via.exec(text);
      if (taxa2ViaMatch) {
        faturaData.taxa2Via = parseFloat(
          taxa2ViaMatch[1].replace(/\./g, '').replace(',', '.'),
        );
      }
    } catch (error) {
      this.logger.error(`Erro ao extrair dados do texto: ${error.message}`);
      throw error;
    }

    return faturaData;
  }
}
