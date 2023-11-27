import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateDetalleVentaDto } from './create-detalle-venta.dto';

export class CreateDetalleMultipleDto {
  @IsNumber()
  @IsNotEmpty()
  id_venta: number;

  @ValidateNested({ each: true })
  @Type(() => CreateDetalleVentaDto)
  @IsArray()
  detalles: CreateDetalleVentaDto[];
}
