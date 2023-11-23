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
  cantidad_unidades: string;

  @IsString()
  @IsNotEmpty()
  precio_costo: string;

  @IsString()
  @IsNotEmpty()
  precio_venta: string;

  @IsString()
  @IsNotEmpty()
  url_imagen_producto: string;
}
