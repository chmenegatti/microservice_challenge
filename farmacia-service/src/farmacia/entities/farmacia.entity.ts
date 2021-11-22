import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Farmacia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  tipo: string;

  @Column()
  sedeId: string;

  @Column()
  endereco: string;

  @Column()
  numero: string;

  @Column()
  cep: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  complemento: string;

  @Column()
  telefone: string;

  @Column()
  resposavel: string;

  @Column()
  cnpj: string;

  @Column()
  logoUrl: string;

  @Column()
  outros: string;

  @Column()
  horarioFuncionamento: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @DeleteDateColumn()
  deletadoEm: Date;

  constructor(farmacia?: Partial<Farmacia>) {
    this.id = farmacia?.id || '';
    this.nome = farmacia?.nome || '';
    this.tipo = farmacia?.tipo || '';
    this.sedeId = farmacia?.sedeId || '';
    this.endereco = farmacia?.endereco || '';
    this.numero = farmacia?.numero || '';
    this.cep = farmacia?.cep || '';
    this.bairro = farmacia?.bairro || '';
    this.cidade = farmacia?.cidade || '';
    this.estado = farmacia?.estado || '';
    this.complemento = farmacia?.complemento || '';
    this.telefone = farmacia?.telefone || '';
    this.resposavel = farmacia?.resposavel || '';
    this.cnpj = farmacia?.cnpj || '';
    this.logoUrl = farmacia?.logoUrl || '';
    this.outros = farmacia?.outros || '';
    this.horarioFuncionamento = farmacia?.horarioFuncionamento || '';
    this.criadoEm = farmacia?.criadoEm || new Date();
    this.atualizadoEm = farmacia?.atualizadoEm || new Date();
    this.deletadoEm = farmacia?.deletadoEm || null;
  }
}
