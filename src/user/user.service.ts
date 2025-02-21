import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class userService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getUserEmail(email: string): Promise<string | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (user) {
            return user.email;
        }
        return null;
    }
}
