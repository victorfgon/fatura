import { ParserService } from './parser.service';

jest.mock('pdf-parse', () => {
  return jest.fn().mockResolvedValue({
    text: `
        \n\nValores Faturados\nItens da FaturaUnid.Quant.Preço UnitValor (R$) PIS/COFINSBase Calc.Aliq.ICMSTarifa Unit.\nICMSICMS\nEnergia ElétricakWh     100  0,83394409        83,38 0,65313000 \nEnergia injetada HFPkWh   1.243  0,65313000      -811,84 0,65313000 \nEn comp. s/ ICMSkWh   1.243  0,68383415       850,00 0,65313000 \nContrib Ilum Publica Municipal         35,92\nTaxa de 2ª via de débito          3,84\nTOTAL        161,30\nHistórico de Consumo\nMÊS/ANOCons. kWhMédia kWh/DiaDias\nFEV/23   1.343     47,96   28\nJAN/23   1.054     35,13   30\nDEZ/22   1.109     33,60   33\nNOV/22   1.206     29,41   41\nOUT/22       0      0,00    0\nSET/22       0      0,00    0\nAGO/22       0      0,00    0\nJUL/22       0      0,00    0\nJUN/22       0      0,00    0\nMAI/22       0      0,00    0\nABR/22       0      0,00    0\nMAR/22       0      0,00    0\nFEV/22       0      0,00    0\nReservado ao Fisco\nSEM VALOR FISCAL\nBase de cálculo (R$)Alíquota (%)Valor (R$)\nFale com CEMIG: 116 - CEMIG Torpedo 29810 - Ouvidoria CEMIG: 0800 728 3838 - Agência Nacional de Energia Elétrica - ANEEL - Telefone: 167 - Ligação gratuita de telefones fixos e móveis.\nCódigo de Débito AutomáticoInstalaçãoVencimentoTotal a pagar\n008118741548300429811608/03/2023R$161,30\nFevereiro/2023\nComprovante de Pagamento\nBRONYER TOZATTI FERREIRA\nRUA JOAO DE ASSIS MARTINS 71 IN\nCENTRO SUL\n35182-036 TIMOTEO, MG\nCPF 097.7**.***-**\n        Nº DO CLIENTE                      Nº DA INSTALAÇÃO\n  7202788969        3004298116\n         Referente a                                Vencimento                       Valor a pagar (R$)\n    FEV/2023               08/03/2023               161,30 \nNOTA FISCAL Nº 008681292 - SÉRIE 000\nData de emissão: 23/02/2023\nConsulte pela chave de acesso em:\nhttp://www.sped.fazenda.mg.gov.br/spedmg/nf3e\nchave de acesso:\n31230206981180000116660000086812921035270832\nProtocolo de autorização: 1312300011495395\n24.02.2023 às 01:58:31\nClasseSubclasseModalidade TarifáriaDatas de Leitura\nComercial Outros serviços Convencional B3AnteriorAtualNº de diasPróxima\nTrifásico e outras atividades12/0109/02  2814/03\nInformações Técnicas\nTipo de MediçãoMediçãoLeituraLeituraConstanteConsumo kWh\nAnteriorAtualde Multiplicação\nEnergia kWhAHB98800278826.68628.02911.343    \n \nDOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICASEGUNDA VIA\nCEMIG DISTRIBUIÇÃO S.A. CNPJ 06.981.180/0001-16 / INSC. ESTADUAL 062.322136.0087.\nAV. BARBACENA, 1200 - 17° ANDAR - ALA 1 - BAIRRO SANTO AGOSTINHO\nCEP: 30190-131 - BELO HORIZONTE - MG.TARIFA SOCIAL DE ENERGIA ELÉTRICA - TSEE FOI CRIADA PELA LEI Nº 10.438, DE 26 DE ABRIL DE 2002\nInformações Gerais\nSALDO ATUAL DE GERAÇÃO: 2.097,59 kWh. Tarifa vigente conforme Res Aneel nº 3.046, de 21/06/2022.\nRedução aliquota ICMS conforme Lei Complementar 194/22. Unidade faz parte de sistema de compensação\nde energia. O pagamento desta conta não quita débitos anteriores. Para estes, estão sujeitas penalidades\nlegais vigentes (multas) e/ou atualização financeira (juros)baseadas no vencimento das mesmas. Leitura\nrealizada conforme calendário de faturamento. É dever do consumidor manter os dados cadastrais sempre\natualizados e informar alterações da atividade exercida no local. Faça sua adesão para recebimento da conta\nde energia por e-mail acessando www.cemig.com.br.  JAN/23 Band. Verde - FEV/23 Band. Verde.\n  
      `,
  });
});

describe('ParserService', () => {
  let parserService: ParserService;

  beforeEach(() => {
    parserService = new ParserService();
  });

  describe('parseFatura', () => {
    it('deve extrair os dados corretamente do texto do PDF', async () => {
      const pdfDataText =
        '\n\nValores Faturados\nItens da FaturaUnid.Quant.Preço UnitValor (R$) PIS/COFINSBase Calc.Aliq.ICMSTarifa Unit.\nICMSICMS\nEnergia ElétricakWh     100  0,83394409        83,38 0,65313000 \nEnergia injetada HFPkWh   1.243  0,65313000      -811,84 0,65313000 \nEn comp. s/ ICMSkWh   1.243  0,68383415       850,00 0,65313000 \nContrib Ilum Publica Municipal         35,92\nTaxa de 2ª via de débito          3,84\nTOTAL        161,30\nHistórico de Consumo\nMÊS/ANOCons. kWhMédia kWh/DiaDias\nFEV/23   1.343     47,96   28\nJAN/23   1.054     35,13   30\nDEZ/22   1.109     33,60   33\nNOV/22   1.206     29,41   41\nOUT/22       0      0,00    0\nSET/22       0      0,00    0\nAGO/22       0      0,00    0\nJUL/22       0      0,00    0\nJUN/22       0      0,00    0\nMAI/22       0      0,00    0\nABR/22       0      0,00    0\nMAR/22       0      0,00    0\nFEV/22       0      0,00    0\nReservado ao Fisco\nSEM VALOR FISCAL\nBase de cálculo (R$)Alíquota (%)Valor (R$)\nFale com CEMIG: 116 - CEMIG Torpedo 29810 - Ouvidoria CEMIG: 0800 728 3838 - Agência Nacional de Energia Elétrica - ANEEL - Telefone: 167 - Ligação gratuita de telefones fixos e móveis.\nCódigo de Débito AutomáticoInstalaçãoVencimentoTotal a pagar\n008118741548300429811608/03/2023R$161,30\nFevereiro/2023\nComprovante de Pagamento\nBRONYER TOZATTI FERREIRA\nRUA JOAO DE ASSIS MARTINS 71 IN\nCENTRO SUL\n35182-036 TIMOTEO, MG\nCPF 097.7**.***-**\n        Nº DO CLIENTE                      Nº DA INSTALAÇÃO\n  7202788969        3004298116\n         Referente a                                Vencimento                       Valor a pagar (R$)\n    FEV/2023               08/03/2023               161,30 \nNOTA FISCAL Nº 008681292 - SÉRIE 000\nData de emissão: 23/02/2023\nConsulte pela chave de acesso em:\nhttp://www.sped.fazenda.mg.gov.br/spedmg/nf3e\nchave de acesso:\n31230206981180000116660000086812921035270832\nProtocolo de autorização: 1312300011495395\n24.02.2023 às 01:58:31\nClasseSubclasseModalidade TarifáriaDatas de Leitura\nComercial Outros serviços Convencional B3AnteriorAtualNº de diasPróxima\nTrifásico e outras atividades12/0109/02  2814/03\nInformações Técnicas\nTipo de MediçãoMediçãoLeituraLeituraConstanteConsumo kWh\nAnteriorAtualde Multiplicação\nEnergia kWhAHB98800278826.68628.02911.343    \n \nDOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICASEGUNDA VIA\nCEMIG DISTRIBUIÇÃO S.A. CNPJ 06.981.180/0001-16 / INSC. ESTADUAL 062.322136.0087.\nAV. BARBACENA, 1200 - 17° ANDAR - ALA 1 - BAIRRO SANTO AGOSTINHO\nCEP: 30190-131 - BELO HORIZONTE - MG.TARIFA SOCIAL DE ENERGIA ELÉTRICA - TSEE FOI CRIADA PELA LEI Nº 10.438, DE 26 DE ABRIL DE 2002\nInformações Gerais\nSALDO ATUAL DE GERAÇÃO: 2.097,59 kWh. Tarifa vigente conforme Res Aneel nº 3.046, de 21/06/2022.\nRedução aliquota ICMS conforme Lei Complementar 194/22. Unidade faz parte de sistema de compensação\nde energia. O pagamento desta conta não quita débitos anteriores. Para estes, estão sujeitas penalidades\nlegais vigentes (multas) e/ou atualização financeira (juros)baseadas no vencimento das mesmas. Leitura\nrealizada conforme calendário de faturamento. É dever do consumidor manter os dados cadastrais sempre\natualizados e informar alterações da atividade exercida no local. Faça sua adesão para recebimento da conta\nde energia por e-mail acessando www.cemig.com.br.  JAN/23 Band. Verde - FEV/23 Band. Verde.\n  ';

      const pdfDataBuffer = Buffer.from(pdfDataText, 'utf8');

      const expectedFaturaData = {
        cliente: '7202788969',
        mesReferencia: 'FEV/23',
        dataVencimento: '08/03/2023',
        energiaEletricaKwh: 100,
        energiaEletricaPrecoUnit: 0.83394409,
        energiaEletricaValor: 83.38,
        energiaInjetadaHfpKwh: 1243,
        energiaInjetadaHfpPrecoUnit: 0.65313,
        energiaInjetadaHfpValor: -811.84,
        enCompSemIcmsKwh: 1243,
        enCompSemIcmsPrecoUnit: 0.68383415,
        enCompSemIcmsValor: 850,
        contribIlumPublicaMunicipal: 35.92,
        valorTotal: 161.3,
        nome: 'BRONYER TOZATTI FERREIRA',
        instalacao: '3004298116',
        cep: '30190-131',
        taxa2Via: 3.84,
      };

      const parsedFaturaData = await parserService.parseFatura(pdfDataBuffer);

      expect(parsedFaturaData).toEqual(expectedFaturaData);
    });
  });
});
