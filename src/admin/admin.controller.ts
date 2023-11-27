import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Serialize } from '../interceptors/serialize.interceptors';
import { AdminDto } from './dtos/admin.dto';
import { SignUpAdminDto } from './dtos/signup_admin.dto';
import { LocalAdminGuard } from './admin-guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Serialize(AdminDto)
  @Get()
  getAllAdmins() {
    return this.adminService.getAll();
  }

  @Serialize(AdminDto)
  @Get()
  getAllByEmail(@Query('correo_electronico') correo_electronico: string) {
    return this.adminService.getByEmail(correo_electronico);
  }

  @Serialize(AdminDto)
  @Get('/:id')
  async getOneAdmin(@Param('id') adminId: string) {
    const foundAdmin = await this.adminService.getOne(parseInt(adminId));
    if (!foundAdmin) {
      throw new NotFoundException('The account does not exists');
    }

    return foundAdmin;
  }
  @Post('/signup')
  async signupAdmin(@Body() body: SignUpAdminDto) {
    const admin = await this.adminService.signupAdmin(
      body.nombre_usuario,
      body.correo_electronico,
      body.contrasena,
      body.nombre_tienda,
      body.logo_tienda,
    );
    return admin;
  }

  @UseGuards(LocalAdminGuard)
  @Post('/login')
  async loginAccountAdmin(@Request() req: any) {
    return await this.adminService.jwtValidationAdmin(req.admin);
  }
}
