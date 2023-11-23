import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClientesDto } from './dtos/create-clientes.dto';
import { Cliente } from './cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get()
  async getAllClientes(): Promise<Cliente[]> {
    const cliente = await this.clienteService.getAll();
    return cliente;
  }

  @Get('/:id')
  async getClienteById(@Param('id') id_cliente: string): Promise<Cliente> {
    const cliente = await this.clienteService.getById(parseInt(id_cliente));

    return cliente;
  }

  @Post()
  async createCliente(@Body() body: CreateClientesDto): Promise<Cliente> {
    const cliente = await this.clienteService.create(body);
    return cliente;
  }

  @Delete('/:id')
  async deleteCliente(@Param('id') id_cliente: string): Promise<Cliente> {
    return this.clienteService.delete(parseInt(id_cliente));
  }

  @Put('/:id')
  async updateCliente(
    @Param('id') id_cliente: string,
    @Body() body: CreateClientesDto,
  ): Promise<Cliente> {
    const cliente = await this.clienteService.update(
      parseInt(id_cliente),
      body,
    );
    return cliente;
  }
}
