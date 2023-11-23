import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from '../admin/admin.entity';

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
}
