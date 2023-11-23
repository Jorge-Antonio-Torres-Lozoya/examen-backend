import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsEmail()
  @IsNotEmpty()
  correo_electronico_cliente: string;
  @IsString()
  @IsNotEmpty()
  nombre_cliente: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  telefono: number;

  @IsString()
  @IsNotEmpty()
  url_imagen_cliente: string;
}
