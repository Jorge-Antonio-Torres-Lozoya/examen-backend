import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { CreateProductosDto } from './dtos/create-productos.dto';

@Controller('producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  async getAllproductos(): Promise<Producto[]> {
    const producto = await this.productoService.getAll();
    return producto;
  }

  @Get('/:id')
  async getProductoById(@Param('id') id_producto: string): Promise<Producto> {
    const producto = await this.productoService.getById(parseInt(id_producto));

    return producto;
  }

  @Post()
  async createProducto(@Body() body: CreateProductosDto): Promise<Producto> {
    const producto = await this.productoService.create(body);
    return producto;
  }

  @Delete('/:id')
  async deleteProducto(@Param('id') id_producto: string): Promise<Producto> {
    return this.productoService.delete(parseInt(id_producto));
  }

  @Put('/:id')
  async updateProducto(
    @Param('id') id_producto: string,
    @Body() body: CreateProductosDto,
  ): Promise<Producto> {
    const producto = await this.productoService.update(
      parseInt(id_producto),
      body,
    );
    return producto;
  }
}
