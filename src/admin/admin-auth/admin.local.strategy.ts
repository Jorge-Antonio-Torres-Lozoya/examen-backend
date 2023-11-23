import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminService } from '../admin.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private adminService: AdminService) {
    super({ usernameField: 'correo_electronico', passwordField: 'contrasena' });
  }

  async validate(correo_electronico: string, contrasena: string) {
    const admin = await this.adminService.loginAdmin(
      correo_electronico,
      contrasena,
    );
    if (!admin) {
      throw new UnauthorizedException('Error, la información es incorrecta');
    }

    return admin;
  }
}
