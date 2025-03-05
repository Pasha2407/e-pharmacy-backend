import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Post('login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Headers('authorization') authHeader: string) {
        return this.authService.logout(authHeader);
    }

    @Get('email')
    @UseGuards(JwtAuthGuard)
    getUserEmail(@Headers('authorization') authHeader: string) {
        return this.authService.getUserEmail(authHeader);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() {
        return { message: 'Redirecting to Google...' };
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback() {
        return `
            <script>
                window.opener.location.href = "http://localhost:3000/e-pharmacy/admin/dashboard";
                window.close();
            </script>
        `}
}
