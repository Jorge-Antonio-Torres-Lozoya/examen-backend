import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Venta } from '../venta/venta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from './detalle-venta.entity';
import { CreateDetalleVentaDto } from './dtos/create-detale-venta.dto';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(Venta) private repoVenta: Repository<Venta>,
    @InjectRepository(DetalleVenta) private repo: Repository<DetalleVenta>,
    @InjectRepository(Producto) private repoProducto: Repository<Producto>,
  ) {}

  async getAll(): Promise<DetalleVenta[]> {
    const detalleVentas = await this.repo.find({
      relations: {
        venta: true,
        producto: true,
      },
    });
    return detalleVentas;
  }

  async getById(id: number): Promise<DetalleVenta> {
    1;
    const detalleVenta = await this.repo.findOne({
      where: { id_detalle_venta: id },
      relations: {
        venta: true,
        producto: true,
      },
    });
    return detalleVenta;
  }

  async create(createData: CreateDetalleVentaDto): Promise<DetalleVenta> {
    const venta = await this.repoVenta.findOne({
      where: { id_venta: createData.id_venta },
    });
    if (!venta) {
      throw new BadRequestException('No existe la venta');
    }

    const producto = await this.repoProducto.findOne({
      where: { id_producto: createData.id_producto },
    });
    if (!producto) {
      throw new BadRequestException('No existe el producto');
    }

    const detalleVenta = this.repo.create({
      cantidad: createData.cantidad,
      precio_unitario: createData.precio_unitario,
      venta: venta,
      producto: producto,
    });
    await this.repo.save(detalleVenta);
    const foundDetalleVenta = await this.repo.findOne({
      where: { id_detalle_venta: detalleVenta.id_detalle_venta },
    });
    if (!foundDetalleVenta) {
      throw new BadRequestException('No se pudo crear el detalle de venta');
    }
    return foundDetalleVenta;
  }

  async delete(id: number): Promise<DetalleVenta> {
    const detalleVenta = await this.repo.findOne({
      where: { id_detalle_venta: id },
    });
    if (!detalleVenta) {
      throw new NotFoundException('No existe el detalle de venta');
    }
    return this.repo.remove(detalleVenta);
  }

  async update(id: number, attrs: Partial<DetalleVenta>) {
    const detalleVenta = await this.repo.findOne({
      where: { id_detalle_venta: id },
    });
    if (!detalleVenta) {
      throw new NotFoundException('No existe el detalle de venta');
    }
    Object.assign(detalleVenta, attrs);
    return this.repo.save(detalleVenta);
  }
}
