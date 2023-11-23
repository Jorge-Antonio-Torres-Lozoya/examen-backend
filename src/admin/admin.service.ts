import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Admin } from './admin.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private repo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async getByEmail(correo_electronico: string) {
    const admin = await this.repo.find({ where: { correo_electronico } });

    if (!admin) {
      return null;
    }

    return admin;
  }

  getAll() {
    return this.repo.find();
  }

  async getOne(admin_id: number) {
    const findAdmin = await this.repo.findOne({ where: { admin_id } });

    if (!findAdmin) {
      return null;
    }

    return findAdmin;
  }

  createAdmin(
    nombre_usuario: string,
    correo_electronico: string,
    contrasena: string,
    nombre_tienda: string,
  ) {
    const createdAdmin = this.repo.create({
      nombre_usuario,
      correo_electronico,
      contrasena,
      nombre_tienda,
    });
    return this.repo.save(createdAdmin);
  }

  async hashPassword(contrasena: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(contrasena, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async signupAdmin(
    nombre_usuario: string,
    correo_electronico: string,
    contrasena: string,
    nombre_tienda: string,
  ) {
    const admins = await this.getByEmail(correo_electronico);

    if (admins.length) {
      throw new BadRequestException('Error, the email belongs to another user');
    }

    const hash = await this.hashPassword(contrasena);
    const admin = await this.createAdmin(
      nombre_usuario,
      correo_electronico,
      hash,
      nombre_tienda,
    );
    return admin;
  }

  async loginAdmin(correo_electronico: string, contrasena: string) {
    const [admin] = await this.getByEmail(correo_electronico);

    if (!admin) {
      throw new NotFoundException('Error, the account does not exists');
    }

    const [salt, storedHash] = admin.contrasena.split('.');
    const hash = (await scrypt(contrasena, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('The email or password is incorrect');
    }

    return admin;
  }

  async jwtValidationAdmin(admin: any) {
    const payload = { sub: admin.admin_id };
    return {
      access_token: this.jwtService.sign(payload),
      admin_id: admin.admin_id,
    };
  }

  async delete(admin_id: number) {
    const deletedAdmin = await this.repo.findOne({ where: { admin_id } });
    return this.repo.remove(deletedAdmin);
  }
}
