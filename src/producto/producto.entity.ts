import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { DetalleVenta } from '../detalle-venta/detalle-venta.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre_producto: string;

  @Column()
  descripcion: string;

  @Column()
  cantidad_unidades: number;

  @Column()
  precio_costo: number;
  @Column()
  precio_venta: number;

  @Column()
  url_imagen_producto: string;

  @ManyToOne(() => Admin, (admin) => admin.productos, {
    onDelete: 'CASCADE',
  })
  admin: Admin;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.producto)
  detalles: DetalleVenta[];
}
