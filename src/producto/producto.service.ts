import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductosDto } from './dtos/create-productos.dto';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto) private repo: Repository<Producto>,
    @InjectRepository(Admin) private repoAdmin: Repository<Admin>,
  ) {}

  async getAll(): Promise<Producto[]> {
    const productos = await this.repo.find({
      relations: {
        admin: true,
      },
    });
    return productos;
  }

  async getById(id: number): Promise<Producto> {
    const producto = await this.repo.findOne({
      where: { id_producto: id },
      relations: {
        admin: true,
      },
    });
    if (!producto) {
      throw new NotFoundException('No existe el producto');
    }
    return producto;
  }

  async create(createDto: CreateProductosDto): Promise<Producto> {
    const admin = await this.repoAdmin.findOne({
      where: { admin_id: createDto.admin_id },
    });
    if (!admin) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }
    const producto = this.repo.create({
      nombre_producto: createDto.nombre_producto,
      descripcion: createDto.descripcion,
      cantidad_unidades: createDto.cantidad_unidades,
      precio_costo: createDto.precio_costo,
      precio_venta: createDto.precio_venta,
      url_imagen_producto: createDto.url_imagen_producto,
      admin: admin,
    });
    await this.repo.save(producto);
    const foundProducto = await this.repo.findOne({
      where: { id_producto: producto.id_producto },
    });
    if (!foundProducto) {
      throw new NotFoundException('El producto no fue encontrado');
    }
    return foundProducto;
  }

  async delete(id: number): Promise<Producto> {
    const producto = await this.repo.findOne({
      where: { id_producto: id },
    });
    if (!producto) {
      throw new NotFoundException('El producto no fue encontrado');
    }
    return this.repo.remove(producto);
  }

  async update(id: number, attrs: Partial<Producto>) {
    const producto = await this.repo.findOne({
      where: { id_producto: id },
    });
    if (!producto) {
      throw new NotFoundException('El producto no fue encontrado');
    }
    Object.assign(producto, attrs);
    return this.repo.save(producto);
  }
}
