import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientesDto {
  @IsString()
  @IsNotEmpty()
  nombre_cliente: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsNumber()
  @IsNotEmpty()
  telefono: number;

  @IsEmail()
  @IsNotEmpty()
  correo_electronico_cliente: string;

  @IsString()
  @IsNotEmpty()
  url_imagen_cliente: string;

  @IsNumber()
  @IsNotEmpty()
  admin_id: number;
}
