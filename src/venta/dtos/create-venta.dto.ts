import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @IsNumber()
  @IsNotEmpty()
  id_cliente: number;

  @IsNumber()
  @IsNotEmpty()
  admin_id: number;

  @IsDate()
  @IsNotEmpty()
  fecha_venta: Date;
}
