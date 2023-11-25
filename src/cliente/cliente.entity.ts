import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { Venta } from '../venta/venta.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column()
  nombre_cliente: string;

  @Column()
  direccion: string;

  @Column()
  telefono: number;

  @Column()
  correo_electronico_cliente: string;

  @Column()
  url_imagen_cliente: string;

  @ManyToOne(() => Admin, (admin) => admin.clientes, {
    onDelete: 'CASCADE',
  })
  admin: Admin;

  @OneToMany(() => Venta, (ventas) => ventas.cliente, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  ventas: Venta[];
}
