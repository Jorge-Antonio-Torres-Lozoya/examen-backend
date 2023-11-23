import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from '../producto/producto.entity';
import { Cliente } from '../cliente/cliente.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column()
  nombre_usuario: string;

  @Column({ unique: true })
  correo_electronico: string;

  @Column()
  contrasena: string;

  @Column()
  nombre_tienda: string;

  @OneToMany(() => Producto, (productos) => productos.admin, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  productos: Producto[];

  @OneToMany(() => Cliente, (clientes) => clientes.admin, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  clientes: Cliente[];
}
