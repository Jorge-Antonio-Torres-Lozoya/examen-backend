import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @IsNumber()
  @IsNotEmpty()
  id_cliente: number;

  @IsNumber()
  @IsNotEmpty()
  admin_id: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fecha_venta: Date;
}
