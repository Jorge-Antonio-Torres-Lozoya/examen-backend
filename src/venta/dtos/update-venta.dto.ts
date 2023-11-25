import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateVentaDto {
  @IsDate()
  @IsNotEmpty()
  fecha_venta: Date;
}
