import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  telefono: number;

  @IsString()
  @IsNotEmpty()
  url_imagen_cliente: string;
}
