import { Controller, Get, Param } from '@nestjs/common';
import { userService } from './user.service';

@Controller('user')
export class userController {
    constructor(private readonly userService: userService) { }

    @Get('email/:email')
    async getUserEmail(@Param('email') email: string) {
        const userEmail = await this.userService.getUserEmail(email);
        if (userEmail) {
            return { email: userEmail };
        }
        return { message: 'User not found' };
    }
}
