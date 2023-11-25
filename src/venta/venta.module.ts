import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './venta.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Admin, Cliente])],
  providers: [VentaService],
  controllers: [VentaController],
})
export class VentaModule {}
