import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { Cliente } from '../cliente/cliente.entity';
import { DetalleVenta } from '../detalle-venta/detalle-venta.entity';
@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id_venta: number;

  @Column()
  fecha_venta: Date;

  @ManyToOne(() => Admin, (admin) => admin.ventas)
  admin: Admin;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  cliente: Cliente;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta, {
    onDelete: 'CASCADE',
  })
  detalles: DetalleVenta[];
}
