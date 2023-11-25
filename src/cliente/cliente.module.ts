import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/admin.entity';
import { Cliente } from './cliente.entity';
import { Venta } from '../venta/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Admin, Venta])],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
