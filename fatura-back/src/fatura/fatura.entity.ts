import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDecimal,
} from 'class-validator';

@Entity()
export class Fatura {
  @ApiProperty({ example: 1, description: 'Identificador único da fatura' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '3004298116',
    description: 'Número do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  cliente: string;

  @ApiProperty({ example: '3004298116', description: 'Número da instalação' })
  @IsNotEmpty()
  @IsString()
  @Column()
  instalacao: string;

  @ApiProperty({
    example: 'JOAO FULANO',
    description: 'Nome do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  nome: string;

  @ApiProperty({ example: '35182-036', description: 'CEP do cliente' })
  @IsNotEmpty()
  @IsString()
  @Column()
  cep: string;

  @ApiProperty({
    example: 'FEV/23',
    description: 'Mês de referência da fatura',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  mesReferencia: string;

  @ApiProperty({
    example: '08/03/2023',
    description: 'Data de vencimento da fatura',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  dataVencimento: string;

  @ApiProperty({
    example: 100,
    description: 'Consumo de energia elétrica em kWh',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float' })
  energiaEletricaKwh: number;

  @ApiProperty({
    example: 0.83394409,
    description: 'Preço unitário da energia elétrica',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float' })
  energiaEletricaPrecoUnit: number;

  @ApiProperty({
    example: 83.38,
    description: 'Valor total da energia elétrica',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float' })
  energiaEletricaValor: number;

  @ApiProperty({
    example: 1243,
    description: 'Consumo de energia injetada HFP em kWh',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  energiaInjetadaHfpKwh: number;

  @ApiProperty({
    example: 0.65313,
    description: 'Preço unitário da energia injetada HFP',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  energiaInjetadaHfpPrecoUnit: number;

  @ApiProperty({
    example: -811.84,
    description: 'Valor total da energia injetada HFP',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  energiaInjetadaHfpValor: number;

  @ApiProperty({
    example: 1243,
    description: 'Consumo de energia compensada sem ICMS',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  enCompSemIcmsKwh: number;

  @ApiProperty({
    example: 0.68383415,
    description: 'Preço unitário da energia compensada sem ICMS',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  enCompSemIcmsPrecoUnit: number;

  @ApiProperty({
    example: 850.0,
    description: 'Valor total da energia compensada sem ICMS',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  enCompSemIcmsValor: number;

  @ApiProperty({
    example: 35.92,
    description: 'Valor da contribuição de iluminação pública municipal',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  contribIlumPublicaMunicipal: number;

  @ApiProperty({
    example: 3.84,
    description: 'Valor da taxa de 2ª via de débito',
  })
  @IsOptional()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float', nullable: true })
  taxa2Via: number;

  @ApiProperty({ example: 161.3, description: 'Valor total da fatura' })
  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  @Column({ type: 'float' })
  valorTotal: number;
}
