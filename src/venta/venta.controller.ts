import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VentaService } from './venta.service';
import { Venta } from './venta.entity';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { UpdateVentaDto } from './dtos/update-venta.dto';

@Controller('venta')
export class VentaController {
  constructor(private ventaService: VentaService) {}

  @Get()
  async getAllVentas(): Promise<Venta[]> {
    const venta = await this.ventaService.getAll();
    return venta;
  }

  @Get('/:id')
  async getVentaById(@Param('id') id_venta: string): Promise<Venta> {
    const venta = await this.ventaService.getById(parseInt(id_venta));
    return venta;
  }

  @Post()
  async createVenta(@Body() body: CreateVentaDto): Promise<Venta> {
    const venta = await this.ventaService.create(body);
    return venta;
  }

  @Put('/:id')
  async updateVenta(
    @Param('id') id_venta: string,
    @Body() body: UpdateVentaDto,
  ): Promise<Venta> {
    const venta = await this.ventaService.update(parseInt(id_venta), body);
    return venta;
  }

  @Delete('/:id')
  async deleteVenta(@Param('id') id_venta: string): Promise<Venta> {
    return this.ventaService.delete(parseInt(id_venta));
  }
}
