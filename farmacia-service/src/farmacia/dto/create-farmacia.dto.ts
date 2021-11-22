import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFarmaciaDto {
  @IsString()
  @MinLength(3)
  nome: string;

  @IsString()
  tipo: string;

  @IsString()
  sedeId?: string;

  @IsString()
  endereco: string;

  @IsString()
  numero: string;

  @IsString()
  @MaxLength(8)
  cep: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  @MaxLength(2)
  estado: string;

  @IsString()
  complemento: string;

  @IsString()
  telefone: string;

  @IsString()
  resposavel: string;

  @IsString()
  cnpj: string;

  @IsString()
  logoUrl: string;

  @IsString()
  outros: string;

  @IsString()
  horarioFuncionamento: string;
}
