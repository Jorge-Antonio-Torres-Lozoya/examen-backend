import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Venta } from './venta.entity';
import { Cliente } from '../cliente/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Cliente) private repo: Repository<Cliente>,
    @InjectRepository(Admin) private repoAdmin: Repository<Admin>,
    @InjectRepository(Venta) private repoVenta: Repository<Venta>,
  ) {}

  async getAll(): Promise<Venta[]> {
    const ventas = await this.repoVenta.find({
      relations: {
        admin: true,
        cliente: true,
      },
    });
    return ventas;
  }

  async getById(id: number): Promise<Venta> {
    const venta = await this.repoVenta.findOne({
      where: { id_venta: id },
      relations: {
        admin: true,
        cliente: true,
      },
    });
    if (!venta) {
      throw new NotFoundException('No existe el venta');
    }
    return venta;
  }

  async delete(id: number): Promise<Venta> {
    const venta = await this.repoVenta.findOne({
      where: { id_venta: id },
    });
    if (!venta) {
      throw new NotFoundException('El venta no fue encontrado');
    }
    return this.repoVenta.remove(venta);
  }

  async create(createData: CreateVentaDto): Promise<Venta> {
    const admin = await this.repoAdmin.findOne({
      where: { admin_id: createData.admin_id },
    });
    if (!admin) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }
    const cliente = await this.repo.findOne({
      where: { id_cliente: createData.id_cliente },
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no fue encontrado.');
    }
    const venta = this.repoVenta.create({
      fecha_venta: createData.fecha_venta,
      cliente: cliente,
    });
    await this.repoVenta.save(venta);
    const foundVenta = await this.repoVenta.findOne({
      where: { id_venta: venta.id_venta },
    });
    if (!foundVenta) {
      throw new NotFoundException('La venta no fue encontrada');
    }
    return foundVenta;
  }

  async update(id: number, attrs: Partial<Venta>) {
    const venta = await this.repoVenta.findOne({
      where: { id_venta: id },
    });
    if (!venta) {
      throw new NotFoundException('La venta no fue encontrada');
    }
    Object.assign(venta, attrs);
    return this.repo.save(venta);
  }
}
