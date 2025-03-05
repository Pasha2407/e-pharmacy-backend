import { Profile } from 'passport-google-oauth20';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/user.schema";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService) { }

    private async generateToken(user: User): Promise<string> {
        const payload = { _id: user._id, email: user.email };
        return this.jwtService.sign(payload);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Incorrect email or password' })
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Incorrect email or password' })
    }

    private async extractUserId(authHeader: string): Promise<string> {
        const token = authHeader.split(' ')[1];
        const { _id } = this.jwtService.verify<{ _id: string }>(token);
        return _id;
    }

    private async extractUserEmail(authHeader: string): Promise<string> {
        const token = authHeader.split(' ')[1];
        const { email } = this.jwtService.verify<{ email: string }>(token);
        return email;
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('A user with this email exists', HttpStatus.CONFLICT);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })
        const token = await this.generateToken(user);
        user.token = token;
        await user.save();
        return { token };
    }

    async login(userDto: CreateUserDto): Promise<{ token: string }> {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);
        user.token = token;
        await user.save();
        return { token };
    }

    async logout(authHeader: string): Promise<{ message: string }> {
        const userId = await this.extractUserId(authHeader);
        await this.userService.updateUser(userId, { token: null });
        return { message: 'Logout successful' };
    }

    async getUserEmail(authHeader: string) {
        const userEmail = await this.extractUserEmail(authHeader);
        return { userEmail };
    }

    async validateOAuthUser(profile: Profile) {
        let user = await this.userService.findByGoogleId(profile.id);
        if (!user) {
            user = await this.userService.createOAuthUser({
                googleId: profile.id,
                email: profile.emails[0].value,
            });
        }
        const token = this.jwtService.sign({ _id: user._id, email: user.email });
        user.token = token;
        await user.save();
        return { user, token };
    }
}