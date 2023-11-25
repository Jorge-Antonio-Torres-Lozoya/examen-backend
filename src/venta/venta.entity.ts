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

  @ManyToOne(() => Admin, (admin) => admin.ventas, {
    onDelete: 'CASCADE',
  })
  admin: Admin;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detalles: DetalleVenta[];
}
