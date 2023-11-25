import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVenta } from './detalle-venta.entity';
import { CreateDetalleVentaDto } from './dtos/create-detale-venta.dto';
import { UpdateDetalleVentaDto } from './dtos/update-detalle-venta.dto';

@Controller('detalle-venta')
export class DetalleVentaController {
  constructor(private detalleVentaService: DetalleVentaService) {}

  @Get()
  async getAllDetalleVentas(): Promise<DetalleVenta[]> {
    const detalleVenta = await this.detalleVentaService.getAll();
    return detalleVenta;
  }

  @Get('/:id')
  async getDetalleVentaById(
    @Param('id') id_detalle_venta: string,
  ): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaService.getById(
      parseInt(id_detalle_venta),
    );

    return detalleVenta;
  }

  @Post()
  async createDetalleVenta(
    @Body() body: CreateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaService.create(body);
    return detalleVenta;
  }

  @Delete('/:id')
  async deleteDetalleVenta(
    @Param('id') id_detalle_venta: string,
  ): Promise<DetalleVenta> {
    return this.detalleVentaService.delete(parseInt(id_detalle_venta));
  }

  @Put('/:id')
  async updateDetalleVenta(
    @Param('id') id_detalle_venta: string,
    @Body() body: UpdateDetalleVentaDto,
  ): Promise<DetalleVenta> {
    const detalleVenta = await this.detalleVentaService.update(
      parseInt(id_detalle_venta),
      body,
    );
    return detalleVenta;
  }
}
