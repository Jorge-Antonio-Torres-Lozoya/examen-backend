import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre_producto: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  cantidad_unidades: number;

  @IsString()
  @IsNotEmpty()
  precio_costo: number;

  @IsString()
  @IsNotEmpty()
  precio_venta: number;

  @IsString()
  @IsNotEmpty()
  url_imagen_producto: string;
}
