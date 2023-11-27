import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Venta } from '../venta/venta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from './detalle-venta.entity';
import { CreateDetalleVentaDto } from './dtos/create-detalle-venta.dto';
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

  // async create(createData: CreateDetalleVentaDto): Promise<DetalleVenta> {
  //   const venta = await this.repoVenta.findOne({
  //     where: { id_venta: createData.id_venta },
  //   });
  //   if (!venta) {
  //     throw new BadRequestException('No existe la venta');
  //   }

  //   const producto = await this.repoProducto.findOne({
  //     where: { id_producto: createData.id_producto },
  //   });
  //   if (!producto) {
  //     throw new BadRequestException('No existe el producto');
  //   }
  //   if (producto.cantidad_unidades < createData.cantidad) {
  //     throw new BadRequestException(
  //       'Stock insuficiente para realizar la venta',
  //     );
  //   }

  //   const detalleVenta = this.repo.create({
  //     cantidad: createData.cantidad,
  //     precio_unitario: createData.precio_unitario,
  //     venta: venta,
  //     producto: producto,
  //   });
  //   await this.repo.save(detalleVenta);
  //   producto.cantidad_unidades -= createData.cantidad;
  //   await this.repoProducto.save(producto);

  //   const foundDetalleVenta = await this.repo.findOne({
  //     where: { id_detalle_venta: detalleVenta.id_detalle_venta },
  //   });
  //   if (!foundDetalleVenta) {
  //     throw new BadRequestException('No se pudo crear el detalle de venta');
  //   }
  //   return foundDetalleVenta;
  // }

  async createMultiple(
    idVenta: number,
    detallesVenta: CreateDetalleVentaDto[],
  ): Promise<DetalleVenta[]> {
    // Verifica que la venta exista
    const venta = await this.repoVenta.findOne({
      where: { id_venta: idVenta },
    });
    if (!venta) {
      throw new BadRequestException('No existe la venta');
    }

    const detallesCreados: DetalleVenta[] = [];
    for (const detalleData of detallesVenta) {
      // Verifica que el producto exista y tenga stock suficiente
      const producto = await this.repoProducto.findOne({
        where: { id_producto: detalleData.id_producto },
      });
      if (!producto) {
        throw new BadRequestException(
          `No existe el producto con ID ${detalleData.id_producto}`,
        );
      }
      if (producto.cantidad_unidades < detalleData.cantidad) {
        throw new BadRequestException(
          'Stock insuficiente para realizar la venta',
        );
      }

      // Crear el detalle de venta
      const detalleVenta = this.repo.create({
        cantidad: detalleData.cantidad,
        precio_unitario: detalleData.precio_unitario,
        venta: venta,
        producto: producto,
      });

      await this.repo.save(detalleVenta);
      detallesCreados.push(detalleVenta);

      // Actualizar el stock del producto
      producto.cantidad_unidades -= detalleData.cantidad;
      await this.repoProducto.save(producto);
    }

    return detallesCreados;
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
