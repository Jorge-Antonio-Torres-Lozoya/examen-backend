import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpAdminDto {
  @IsString()
  @IsNotEmpty()
  nombre_usuario: string;

  @IsEmail()
  @IsNotEmpty()
  correo_electronico: string;

  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @IsString()
  @IsNotEmpty()
  nombre_tienda: string;
}
