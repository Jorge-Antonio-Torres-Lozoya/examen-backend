import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from './admin.entity';
import { AdminLocalStrategy } from './admin-auth/admin.local.strategy';
import { AdminJwtStrategy } from './admin-auth/admin.jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forFeature([Admin]),
    PassportModule.register({ property: 'admin' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_ADMIN'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AdminService, AdminLocalStrategy, AdminJwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
