import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';

import { Admin } from '../admin/admin.entity';
import { CreateClientesDto } from './dtos/create-clientes.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private repo: Repository<Cliente>,
    @InjectRepository(Admin) private repoAdmin: Repository<Admin>,
  ) {}
  async getAll(): Promise<Cliente[]> {
    const clientes = await this.repo.find({
      relations: {
        admin: true,
      },
    });
    return clientes;
  }

  async getById(id: number): Promise<Cliente> {
    const cliente = await this.repo.findOne({
      where: { id_cliente: id },
      relations: {
        admin: true,
      },
    });
    return cliente;
  }

  async create(createDto: CreateClientesDto): Promise<Cliente> {
    const admin = await this.repoAdmin.findOne({
      where: { admin_id: createDto.admin_id },
    });
    if (!admin) {
      throw new BadRequestException('No existe el usuario');
    }

    const cliente = this.repo.create({
      nombre_cliente: createDto.nombre_cliente,
      direccion: createDto.direccion,
      telefono: createDto.telefono,
      correo_electronico_cliente: createDto.correo_electronico_cliente,
      url_imagen_cliente: createDto.url_imagen_cliente,
      admin: admin,
    });
    await this.repo.save(cliente);

    const foundCliente = await this.repo.findOne({
      where: { id_cliente: cliente.id_cliente },
    });
    if (!foundCliente) {
      throw new BadRequestException('No se pudo crear el cliente');
    }
    return foundCliente;
  }

  async delete(id: number): Promise<Cliente> {
    const cliente = await this.repo.findOne({
      where: { id_cliente: id },
    });
    if (!cliente) {
      throw new NotFoundException('El cliente no fue encontrado');
    }
    return this.repo.remove(cliente);
  }

  async update(id: number, attrs: Partial<Cliente>) {
    const cliente = await this.repo.findOne({
      where: { id_cliente: id },
    });
    if (!cliente) {
      throw new NotFoundException('El cliente no fue encontrado');
    }
    Object.assign(cliente, attrs);
    return this.repo.save(cliente);
  }
}
