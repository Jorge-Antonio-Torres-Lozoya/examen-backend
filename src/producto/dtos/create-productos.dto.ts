import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductosDto {
  @IsNumber()
  @IsNotEmpty()
  admin_id: number;

  @IsString()
  @IsNotEmpty()
  nombre_producto: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad_unidades: number;

  @IsNumber()
  @IsNotEmpty()
  precio_costo: number;

  @IsNumber()
  @IsNotEmpty()
  precio_venta: number;

  @IsString()
  @IsNotEmpty()
  url_imagen_producto: string;
}
