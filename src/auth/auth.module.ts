import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule { }
