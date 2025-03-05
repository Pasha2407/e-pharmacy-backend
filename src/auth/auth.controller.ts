import { Body, Controller, Get, Headers, Post, Request, Res, UseGuards } from '@nestjs/common';
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
    async googleAuthCallback(@Request() req, @Res() res) {
        const user = req.user;
        const userData = JSON.stringify({ user: user.user });
        res.send(`
      <script>
        window.opener.postMessage(${userData}, "http://localhost:3000");
        window.close();
      </script>
    `);
    }
}
