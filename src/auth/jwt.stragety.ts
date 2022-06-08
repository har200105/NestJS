import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";
import {Stragety,ExtractJwt} from 'passport-jwt';
import { UnauthorizedException } from "@nestjs/common";

export class jwtStragety extends PassportStrategy(Stragety) {
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretKey:process.env.JWT_SECRET
        })
    }

    async validate(payload) {
        const { id } = payload;
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new UnauthorizedException('Login first to access this resource');
        }

        return user; 
    }


}