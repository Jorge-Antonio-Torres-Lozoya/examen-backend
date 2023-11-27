import { Expose } from 'class-transformer';

export class AdminDto {
  @Expose()
  admin_id: number;

  @Expose()
  nombre_usuario: string;

  @Expose()
  correo_electronico: string;

  @Expose()
  nombre_tienda: string;

  @Expose()
  logo_tienda: string;
}
