import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    logout() {
        return this.authService.logout()
    }
}
