import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetalleVentaDto {
  // @IsNumber()
  // @IsNotEmpty()
  // id_venta: number;

  @IsNumber()
  @IsNotEmpty()
  id_producto: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  precio_unitario: number;
}
