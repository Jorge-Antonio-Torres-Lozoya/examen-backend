import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './detalle-venta.entity';
import { Venta } from '../venta/venta.entity';
import { Producto } from '../producto/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta, Venta, Producto])],
  providers: [DetalleVentaService],
  controllers: [DetalleVentaController],
})
export class DetalleVentaModule {}
