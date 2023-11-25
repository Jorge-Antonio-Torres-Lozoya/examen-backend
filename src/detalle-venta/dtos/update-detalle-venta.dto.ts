import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDetalleVentaDto {
  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  precio_unitario: number;
}
