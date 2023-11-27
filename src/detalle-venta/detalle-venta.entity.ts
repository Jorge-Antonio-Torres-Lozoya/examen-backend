import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from '../venta/venta.entity';
import { Producto } from '../producto/producto.entity';

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id_detalle_venta: number;

  @Column()
  cantidad: number;

  @Column()
  precio_unitario: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles, {
    onDelete: 'CASCADE',
  })
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  producto: Producto;
}
