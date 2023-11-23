import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Admin])],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
